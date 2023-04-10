function doPost(e) {
  try {
    const folder = DriveApp.getFolderById(e.parameter.folder);
    const blob = Utilities.newBlob(JSON.parse(e.postData.contents), e.parameter.mimeType, e.parameter.fileName);
    folder.createFile(blob);

    const sheet = SpreadsheetApp.openById('1OZJr_VTzFyKMzWUKnz2D3bEJomiqqXjmdop7USlWUsg').getActiveSheet();
    sheet.appendRow([new Date(), e.parameter.issuer, e.parameter.fileName, folder.getUrl()]);
  } catch (error) {
    console.log('Error uploading certificate', error);
    return ContentService.createTextOutput(JSON.stringify({ status: 'failed', data: JSON.stringify(e) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(ContentService.MimeType.JSON);
}
