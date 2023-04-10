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