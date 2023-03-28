function doPost(e) {
  try {
    const folder = DriveApp.getFolderById(e.parameter.folder);
    const blob = Utilities.newBlob(JSON.parse(e.postData.contents), e.parameter.mimeType, e.parameter.fileName);
    folder.createFile(blob);
  } catch (error) {
    console.log('Error uploading certificate', error);
    return ContentService.createTextOutput(JSON.stringify({ status: 'failed', data: JSON.stringify(e) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    let parent = DriveApp.getFolderById('16mW9k1AAo-E95qIe4B0prLbjzEpuUvRe');
    let folder = parent.createFolder('Generated Certificates');
    let url = folder.getUrl();
    let id = folder.getId();

    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', id: id, url: url }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'failed', error: error }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
