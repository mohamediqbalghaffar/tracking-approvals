import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

// Helper to determine letter direction (هاتوو / ڕۆيشتوو) based on subject, title, or folder
function detectDirection(item: any): string {
  const combined = `${item.title || ''} ${item.subjectName || ''} ${item.entityType || ''}`.toLowerCase();
  if (combined.includes('هاتوو') || combined.includes('هاتوی') || combined.includes('هاتوى') || combined.includes('وەڵام') || combined.includes('داواكاری') || combined.includes('داواکاری')) {
    return 'هاتوو';
  }
  if (combined.includes('ڕۆيشتوو') || combined.includes('ڕۆیشتوو') || combined.includes('ڕەوانە') || combined.includes('ناردن') || combined.includes('ئاگاداری') || combined.includes('فەرمان')) {
    return 'ڕۆيشتوو';
  }
  return 'ئەرشیف';
}

function getLocalJsonData(): any[] {
  try {
    const candidates = [
      path.join(process.cwd(), 'data', 'azya_letters.json'),
      path.join(process.cwd(), 'azya_letters.json'),
      path.join(process.cwd(), 'azya_letters_all.json'),
      'D:/badwadachoon/data/azya_letters.json',
      'D:/badwadachoon/azya_letters.json',
    ];

    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(raw);
        const list = Array.isArray(parsed) ? parsed : (parsed.letters || []);
        if (list.length > 0) {
          // Normalize and deduplicate by token / entityNumber
          const seen = new Set<string>();
          const deduped: any[] = [];
          for (const item of list) {
            const key = item.token || `${item.entityNumber}_${item.title}`;
            if (!seen.has(key)) {
              seen.add(key);
              deduped.push({
                ...item,
                direction: item.direction || detectDirection(item),
                archiveDateStr: item.archiveDate || item.archiveDateStr || '',
              });
            }
          }
          return deduped;
        }
      }
    }
  } catch (err) {
    console.error('Error reading local Azya JSON fallback:', err);
  }
  return [];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim().toLowerCase() || '';
    const category = searchParams.get('category')?.trim() || '';
    const direction = searchParams.get('direction')?.trim() || 'all';
    const folder = searchParams.get('folder')?.trim() || '';
    const fromOrgan = searchParams.get('fromOrgan')?.trim() || '';
    const year = searchParams.get('year')?.trim() || '';
    const startDate = searchParams.get('startDate')?.trim() || '';
    const endDate = searchParams.get('endDate')?.trim() || '';
    const all = searchParams.get('all') === 'true';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(500, Math.max(10, parseInt(searchParams.get('pageSize') || '50', 10)));
    const sortBy = searchParams.get('sortBy') || 'archiveDate';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

    // Try querying Prisma first
    let dbLetters: any[] = [];
    let usePrisma = true;

    try {
      if (prisma && prisma.azyaLetter) {
        const count = await prisma.azyaLetter.count();
        if (count > 0) {
          // Prisma has data
          const where: any = {};

          if (search) {
            where.OR = [
              { title: { contains: search, mode: 'insensitive' } },
              { entityNumber: { contains: search, mode: 'insensitive' } },
              { subjectName: { contains: search, mode: 'insensitive' } },
              { entityType: { contains: search, mode: 'insensitive' } },
              { fromOrgan: { contains: search, mode: 'insensitive' } },
            ];
          }

          if (category && category !== 'all') {
            const cats = category.split(',').filter(Boolean);
            if (cats.length > 0) where.entityType = { in: cats };
          }

          if (direction && direction !== 'all') {
            where.direction = direction;
          }

          if (folder && folder !== 'all') {
            where.subjectName = folder;
          }

          if (fromOrgan && fromOrgan !== 'all') {
            where.fromOrgan = fromOrgan;
          }

          if (startDate || endDate) {
            where.archiveDate = {};
            if (startDate) where.archiveDate.gte = new Date(startDate);
            if (endDate) where.archiveDate.lte = new Date(`${endDate}T23:59:59.999Z`);
          }

          const total = await prisma.azyaLetter.count({ where });

          const letters = await prisma.azyaLetter.findMany({
            where,
            orderBy: { [sortBy]: sortOrder },
            skip: all ? undefined : (page - 1) * pageSize,
            take: all ? undefined : pageSize,
          });

          // Fetch aggregate stats
          const allCategories = await prisma.azyaLetter.groupBy({
            by: ['entityType'],
            _count: { entityType: true },
            orderBy: { _count: { entityType: 'desc' } },
          });

          const allFolders = await prisma.azyaLetter.groupBy({
            by: ['subjectName'],
            _count: { subjectName: true },
            orderBy: { _count: { subjectName: 'desc' } },
            take: 20,
          });

          const allDirections = await prisma.azyaLetter.groupBy({
            by: ['direction'],
            _count: { direction: true },
          });

          const categoriesList = allCategories.map((c: any) => ({
            name: c.entityType || 'دیارینەکراو',
            count: c._count.entityType,
          }));

          const foldersList = allFolders
            .filter((f: any) => f.subjectName)
            .map((f: any) => ({
              name: f.subjectName,
              count: f._count.subjectName,
            }));

          const topCategory = categoriesList[0] || { name: 'نییە', count: 0 };
          const incomingCount = allDirections.find((d: any) => d.direction === 'هاتوو')?._count.direction || 0;
          const outgoingCount = allDirections.find((d: any) => d.direction === 'ڕۆيشتوو')?._count.direction || 0;

          return NextResponse.json({
            success: true,
            source: 'database',
            total,
            page: all ? 1 : page,
            pageSize: all ? total : pageSize,
            totalPages: all ? 1 : Math.ceil(total / pageSize),
            letters,
            categories: categoriesList,
            folders: foldersList,
            directions: allDirections.map((d: any) => ({ direction: d.direction || 'ئەرشیف', count: d._count.direction })),
            kpis: {
              totalLetters: count,
              filteredCount: total,
              categoriesCount: categoriesList.length,
              topCategory,
              incomingCount,
              outgoingCount,
            },
          });
        }
      }
    } catch (dbErr) {
      console.warn('Prisma query failed, falling back to local JSON data:', dbErr);
      usePrisma = false;
    }

    // Fallback: in-memory querying over local JSON records
    const rawData = getLocalJsonData();
    let filtered = rawData;

    if (search) {
      filtered = filtered.filter((item) =>
        (item.title && item.title.toLowerCase().includes(search)) ||
        (item.entityNumber && item.entityNumber.toLowerCase().includes(search)) ||
        (item.subjectName && item.subjectName.toLowerCase().includes(search)) ||
        (item.entityType && item.entityType.toLowerCase().includes(search)) ||
        (item.fromOrgan && item.fromOrgan.toLowerCase().includes(search))
      );
    }

    if (category && category !== 'all') {
      const cats = category.split(',').filter(Boolean);
      filtered = filtered.filter((item) => cats.includes(item.entityType));
    }

    if (direction && direction !== 'all') {
      filtered = filtered.filter((item) => item.direction === direction);
    }

    if (folder && folder !== 'all') {
      filtered = filtered.filter((item) => item.subjectName === folder);
    }

    if (fromOrgan && fromOrgan !== 'all') {
      filtered = filtered.filter((item) => item.fromOrgan === fromOrgan);
    }

    if (year && year !== 'all') {
      filtered = filtered.filter((item) => (item.archiveDate || '').startsWith(year));
    }

    if (startDate) {
      filtered = filtered.filter((item) => (item.archiveDate || '') >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter((item) => (item.archiveDate || '') <= `${endDate} 23:59:59`);
    }

    // Sorting
    filtered.sort((a, b) => {
      const valA = a[sortBy] || '';
      const valB = b[sortBy] || '';
      if (sortOrder === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

    const total = filtered.length;
    const paginated = all ? filtered : filtered.slice((page - 1) * pageSize, page * pageSize);

    // Compute distinct categories with counts
    const catMap: Record<string, number> = {};
    const folderMap: Record<string, number> = {};
    const dirMap: Record<string, number> = {};
    const yearMap: Record<string, number> = {};

    rawData.forEach((item) => {
      const cat = item.entityType || 'دیارینەکراو';
      catMap[cat] = (catMap[cat] || 0) + 1;

      if (item.subjectName) {
        folderMap[item.subjectName] = (folderMap[item.subjectName] || 0) + 1;
      }

      const dir = item.direction || 'ئەرشیف';
      dirMap[dir] = (dirMap[dir] || 0) + 1;

      const y = (item.archiveDate || '').slice(0, 4);
      if (y && y.length === 4) {
        yearMap[y] = (yearMap[y] || 0) + 1;
      }
    });

    const categoriesList = Object.entries(catMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const foldersList = Object.entries(folderMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    const yearsList = Object.entries(yearMap)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => b.year.localeCompare(a.year));

    const topCategory = categoriesList[0] || { name: 'نییە', count: 0 };

    return NextResponse.json({
      success: true,
      source: 'json_fallback',
      total,
      page: all ? 1 : page,
      pageSize: all ? total : pageSize,
      totalPages: all ? 1 : Math.ceil(total / pageSize),
      letters: paginated,
      categories: categoriesList,
      folders: foldersList,
      years: yearsList,
      directions: Object.entries(dirMap).map(([direction, count]) => ({ direction, count })),
      kpis: {
        totalLetters: rawData.length,
        filteredCount: total,
        categoriesCount: categoriesList.length,
        topCategory,
        incomingCount: dirMap['هاتوو'] || 0,
        outgoingCount: dirMap['ڕۆيشتوو'] || 0,
      },
    });
  } catch (error: any) {
    console.error('Error in /api/azya/letters:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { letters, clearFirst } = body;

    if (!letters || !Array.isArray(letters)) {
      return NextResponse.json({ error: 'letters array is required' }, { status: 400 });
    }

    // Deduplicate incoming list by token / entityNumber + title
    const seen = new Set<string>();
    const deduped: any[] = [];
    for (const item of letters) {
      const key = item.token || `${item.entityNumber}_${item.title}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push({
          recNo: typeof item.recNo === 'number' ? item.recNo : null,
          token: item.token || null,
          entityNumber: String(item.entityNumber || '').trim(),
          title: String(item.title || 'بێ ناونیشان').trim(),
          entityType: String(item.entityType || item.EntityTypeFarsiName || 'نووسراوی ئەرشیف').trim(),
          subjectName: item.subjectName ? String(item.subjectName).trim() : null,
          archiveDate: item.archiveDate ? new Date(item.archiveDate.replace(/\//g, '-')) : null,
          archiveDateStr: item.archiveDate || null,
          etc: item.etc ? String(item.etc) : null,
          ec: item.ec ? String(item.ec) : null,
          subjectId: item.subjectId ? String(item.subjectId) : null,
          code: item.code ? String(item.code) : null,
          fromOrgan: item.fromOrgan ? String(item.fromOrgan).trim() : null,
          toOrgan: item.toOrgan ? String(item.toOrgan).trim() : null,
          importEntityNumber: item.importEntityNumber ? String(item.importEntityNumber).trim() : null,
          exportEntityNumber: item.exportEntityNumber ? String(item.exportEntityNumber).trim() : null,
          description: item.description ? String(item.description).trim() : null,
          folderRole: item.folderRole || 'ئەرشيفي كارگێڕي HTS/ سەرەكي',
          direction: item.direction || detectDirection(item),
        });
      }
    }

    if (prisma && prisma.azyaLetter) {
      if (clearFirst) {
        await prisma.azyaLetter.deleteMany({});
      }

      // Batch insert in chunks of 200
      const CHUNK_SIZE = 200;
      let inserted = 0;
      for (let i = 0; i < deduped.length; i += CHUNK_SIZE) {
        const chunk = deduped.slice(i, i + CHUNK_SIZE);
        await prisma.azyaLetter.createMany({
          data: chunk,
          skipDuplicates: true,
        });
        inserted += chunk.length;
      }

      const totalInDb = await prisma.azyaLetter.count();
      return NextResponse.json({ success: true, inserted, totalInDb });
    }

    return NextResponse.json({ success: true, processed: deduped.length, message: 'Processed in-memory' });
  } catch (error: any) {
    console.error('Error inserting Azya letters:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
