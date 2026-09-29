/**
 * Azya System URL and Link Generators
 * 
 * Farzin Office Automation utilizes client-side resolution routines (ChangeResolution.js getHomePage())
 * that search window.parent/window.location for 'home_silver.aspx', 'urlservice.aspx', 'modaldialog.aspx', or 'homefrm.aspx'.
 * Appending &home_silver.aspx=1#home_silver.aspx prevents infinite traversal while ensuring direct entry.
 * 
 * Farzin FormBuilder relies on ViewPictureDependencyFrm.aspx to authenticate and resolve the user's
 * active session, RoleID, and UserCode before rendering View.aspx. Calling View.aspx directly without
 * these parameters triggers the "هەڵە لە ئەژمارکردنی کورتەی دراوەکان- 1" error dialog.
 */

export interface AzyaLinkItem {
  token?: string | null;
  subjectId?: string | null;
  subjectName?: string | null;
  entityNumber?: string | null;
  importEntityNumber?: string | null;
}

export const AZYA_HOME_URL = "http://azya.halabjagroup.com/OfficeAutomation/eOrgan/Home/Home_Silver.aspx?SelSoft=746B271D02168914";
export const AZYA_LOGIN_URL = "http://azya.halabjagroup.com/OfficeAutomation/eOrgan/Login/LoginFrm.aspx";

/**
 * Direct Document / Aimed Letter Viewer in Azya (ViewPictureDependencyFrm.aspx).
 * Resolves session, role, and letter token seamlessly and opens inside Azya in full-screen layout.
 */
export function getAzyaDocumentUrl(letter?: AzyaLinkItem | null): string {
  if (letter?.token) {
    return `http://azya.halabjagroup.com/OfficeAutomation/FarzinFormBuilder/Entity/EntityInstance/View/ViewPictureDependencyFrm.aspx?FTM=${encodeURIComponent(letter.token)}&SendCode=-1&FormBuilderDialogKey=***FormBuilderDialog***&home_silver.aspx=1#home_silver.aspx`;
  }
  if (letter?.subjectId) {
    return getAzyaArchiveFolderUrl(letter);
  }
  return AZYA_HOME_URL;
}

/**
 * Login & Return directly to Aimed Letter.
 * If the user's Azya session is expired or logged out on another device,
 * this URL routes them to the Azya login screen with a ReturnUrl parameter.
 * Upon entering their credentials, Farzin automatically redirects them straight
 * into the aimed letter page, completely bypassing the SessionTimeout.aspx dead-end wall.
 */
export function getAzyaLoginAndReturnUrl(letter?: AzyaLinkItem | null): string {
  if (letter?.token) {
    const returnPath = `/OfficeAutomation/FarzinFormBuilder/Entity/EntityInstance/View/ViewPictureDependencyFrm.aspx?FTM=${encodeURIComponent(letter.token)}&SendCode=-1&FormBuilderDialogKey=***FormBuilderDialog***&home_silver.aspx=1#home_silver.aspx`;
    return `http://azya.halabjagroup.com/OfficeAutomation/eOrgan/Login/LoginFrm.aspx?ReturnUrl=${encodeURIComponent(returnPath)}`;
  }
  if (letter?.subjectId) {
    const returnPath = `/OfficeAutomation/FarzinDepartment/Department/ViewContentOfArchiveDepartmentFrm.aspx?SubjectID=${encodeURIComponent(letter.subjectId)}&RoleID=120&OrganizationRoleID=120&home_silver.aspx=1#home_silver.aspx`;
    return `http://azya.halabjagroup.com/OfficeAutomation/eOrgan/Login/LoginFrm.aspx?ReturnUrl=${encodeURIComponent(returnPath)}`;
  }
  return `http://azya.halabjagroup.com/OfficeAutomation/eOrgan/Login/LoginFrm.aspx`;
}

/**
 * Direct Archive Box / Folder Viewer in Azya (ViewContentOfArchiveDepartmentFrm.aspx).
 * Opens the specific box file containing this letter and all surrounding files in Azya.
 */
export function getAzyaArchiveFolderUrl(letter?: AzyaLinkItem | null): string {
  if (letter?.subjectId) {
    return `http://azya.halabjagroup.com/OfficeAutomation/FarzinDepartment/Department/ViewContentOfArchiveDepartmentFrm.aspx?SubjectID=${encodeURIComponent(letter.subjectId)}&RoleID=120&OrganizationRoleID=120&home_silver.aspx=1#home_silver.aspx`;
  }
  return AZYA_HOME_URL;
}

/**
 * Entity Viewer UserControl URL.
 */
export function getAzyaEntityViewerUrl(letter?: AzyaLinkItem | null): string {
  if (letter?.token) {
    return `http://azya.halabjagroup.com/OfficeAutomation/FarzinDepartment/UserControl/Archive/EntityViewer.aspx?Token=${encodeURIComponent(letter.token)}&home_silver.aspx=1#home_silver.aspx`;
  }
  return AZYA_HOME_URL;
}

/**
 * Opens an Azya letter page in a full-screen browser tab.
 * 
 * Avoids restrictive popup window features (which cause half-screen 1060px sizing),
 * ensuring the letter renders in a full, unconstrained browser tab across 100% of the display.
 * 
 * @param url The Azya URL to open
 * @param windowName Target window name (defaults to "_blank" for new full-size tab)
 * @returns The opened window reference, or null if blocked
 */
export function openAzyaWindow(url: string, windowName: string = "_blank"): Window | null {
  if (typeof window === "undefined") return null;
  return window.open(url, windowName);
}
