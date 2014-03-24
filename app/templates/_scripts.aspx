<% if (includejQuery) { %><script type="text/javascript" src="../bower_components/jquery/jquery.min.js"></script><% } if (includejQueryMobile) { %>
<script type="text/javascript" src="../bower_components/jquery-mobile/js/events/touch.js"></script>
<script type="text/javascript" src="../bower_components/jquery-mobile/js/events/orientationchange.js"></script><% } if (includeMalihuScrollbars) { %>
<script type="text/javascript" src="../bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="../bower_components/jquery-mousewheel/jquery.mousewheel.js"></script><% } if (includeColorbox) { %>
<script type="text/javascript" src="../bower_components/colorbox/jquery.colorbox-min.js"></script><% } if (includeMaskedInput) { %>
<script type="text/javascript" src="../bower_components/jquery-maskedinput/dist/jquery.maskedinput.min.js"></script><% } if (includeUglify) { %>
<script type="text/javascript" src="../scripts/scripts.min.js"></script>
<% } else { %><script type="text/javascript" src="../scripts/scripts.js"></script>
<% } if (oldIE) { %><!--[if lt IE 9]>
	<script type="text/javascript" src="../scripts/ie.js"></script>
<![endif]-->
<% } %>