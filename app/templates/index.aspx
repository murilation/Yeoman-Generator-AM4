<!DOCTYPE html>
<% if (includeModernizr) { %><!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<% } else { %><html xml:lang="pt-br" lang="pt-br"><% } %>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=1200px">
<meta name="author" content="AM4 - A Internet de Resultados" />
<meta name="description" content=""/>
<link rel="canonical" href="" />
<meta name="resource-type" content="document"/>
<meta name="content-language" content="pt-br"/>
<meta name="revisit" content="1 day"/>
<meta name="ICBM" content="latlong"/>
<meta name="DC.title" content="<%= siteName %>"/>
<!-- Facebook lê -->
<meta property="og:title" content="<%= siteName %>" /> 
<meta property="og:type" content="website"/>
<meta property="og:description" content="" />
<meta property="og:image" content="../images/ico-facebook.jpg"/>
<meta property="og:url" content=""/>
<!-- Fim Facebook lê -->
<title><%= siteName %></title>
<!--#include file="_icons.aspx"-->
<!--#include file="_css.aspx"-->
<% if (includeShiv) { %><!--[if lt IE 9]>
<script src="../bower_components/html5shiv/dist/html5shiv.js"></script>
<![endif]--><% } if (includeModernizr) { %><script src="../bower_components/modernizr/modernizr.js"></script><% } %>
</head>
<body>
<!--#include file="_analytics.aspx"-->
<form runat="server">

</form>
</body>
</html>
<!--#include file="_scripts.aspx"-->