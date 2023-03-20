function doPost(e) {
  // making folder 
  var parentFolder = DriveApp.getFolderById('parent folder id'); 
  parentFolder.createFolder("Folder name");
  const folderId = parentFolder.getFoldersByName("Folder name").next().getId();

  const blob = Utilities.newBlob(JSON.parse(e.postData.contents), e.parameter.mimeType, e.parameter.filename);
  const file = DriveApp.getFolderById(folderId).createFile(blob);
  const responseObj = {filename: file.getName(), fileId: file.getId(), fileUrl: file.getUrl()};
  return ContentService.createTextOutput(JSON.stringify(responseObj)).setMimeType(ContentService.MimeType.JSON);
}