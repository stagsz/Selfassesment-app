IPW Data Source API
The IPW Data Source API allows you to extract data from the system based on a search filter. A search filter can be configured to expose this data via a URL that can be called from another system. Read more about search filters here.
To access the IPW Data Source API, you need two things:
a user token for the user who will call the search filter
a search filter that has been made available in the IPW Data Source API
You can also find the technical documentation, which includes a description of the code-based installation of the API, as well as a list of available endpoints at  https://metazoapi.support.ipw.dk.
Create a user token
To create a user token, you must locate and edit the user who requires access.
Navigate to [Functions] / [Access and Organisation] / [Users]  in IPW Metazo. Locate the relevant user in the user list and double-click to open the edit dialogue box.
Scroll down to the IPW Data Source API field group and tick the box for Access to Data Source API. This generates a unique user token, as shown below.
Click ‘Save’ to save the changes for the user.
Enable search filters in the IPW Data Source API
Now navigate to  [Tools] / [Search Filter]. Find and edit an existing search filter or create a new one.
In the IPW Data Source API field group, tick  Available via IPW Data Source API. This generates a URL that must be used from another system to retrieve the data returned by the search filter, as well as a URL that can be called to specify the number of data rows found.
Click ‘Save’ to save the changes to the search filter.
IPW data source API configuration
It is possible to configure the data source API with additional options:
Include inactive records – Includes records that are deactivated.
Advanced extraction tool – The extraction tool contains system fields as well as text representations of relational values.
Limit to main table – If the search filter’s data type has varying parent data types/main tables, it is possible to limit the returned data to a specific parent data type/main table.
Column settings – Limit which fields the search filter returns by selecting an existing column setting.
💡TIP: Create and name new column settings specifically for this purpose.
Search Filter | IPW Support
 
IPW Metazo API
Introduction
The IPW Metazo API is designed for those who wish to utilise IPW Metazo’s features in a different way, and to read/send data to and from internal applications.
Configuration
To use the API, you must first visit the API’s configuration page, where, amongst other things, a checksum must be generated and access must be granted to the user(s) who have access to the API. The API configuration is described here [Features] /  [Advanced] /  [Site Administration] /  [Configuration] / [API]
You will also find the technical documentation, which contains a description of the code-based installation of the API, as well as a list of available endpoints at  https://metazoapi.support.ipw.dk.
Getting started
Once you have got to grips with the API and are ready to explore, you can use the following mini-guide:
Start at the endpoint /datatypes : This gives you a list of all data types in the system, e.g. user, or form12345. Each data type corresponds to its own table.
You can then call  /list  with one of the above data types as a parameter. This gives you a list of object IDs, as well as basic metadata for each object. You can enrich the results with specific fields from the data type using the parameter .  fieldsTo learn more about which fields a data type has, use the guide from the article Table Lookup via ODBC mentioned below. The same overview can also be retrieved from the API via the endpoint  /explain  with the given data type as a parameter.
With the object IDs from /list in hand, you can now call /read, which returns all available data about the given object.
Data types and fields
To get started with the API, it is advisable to familiarise yourself with IPW Metazo via the user interface – there you can, among other things, find information about forms and their associated fields. If you use the URL[yourdomain.dk]/metazo/inspect.php?datatype=[datatype], you will receive a list of all fields of that data type. You can read more about field structures in the article Table search via ODBC.
Configuration - API | IPW Support
 https://metazoapi.support.ipw.dk/#intro