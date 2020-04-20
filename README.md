## Convert SQL Server Management Studio query results to HTML table

You can use this functionality at [https://sandersade.github.io/SqlManagementStudio.PasteAsHtml](https://sandersade.github.io/SqlManagementStudio.PasteAsHtml/index.html)

### Introduction

I have needed the results from [SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms) quite often for displaying as a table - whether to display in a website or chat programs that support HTML tables. This has been a pain - save in Studio as CSV, open in Excel, save as HTML.

This projects takes the output from SQL Management Studio query results (right click --> Copy or Copy with headers) and converts the output to basic HTML table that you can style as needed, or just copy-paste as-is.

### Features
* Does not send any data to backend/server, pure HTML/CSS/JS frontend functionality 
* Supports headers
* Automatically encodes HTML critical entities to avoid script injection or display issues
* Copy results either as HTML table code suitable for web pages or as HTML element for pasting into rich text clients

Click on image for larger screenshots

![image](https://user-images.githubusercontent.com/18664267/79770226-cdf34900-8335-11ea-8422-a1eb21eb84ca.png)

![image](https://user-images.githubusercontent.com/18664267/79770365-f9763380-8335-11ea-8cca-fb63f1a5af39.png)
