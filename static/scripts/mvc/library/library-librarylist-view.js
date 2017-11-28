define("mvc/library/library-librarylist-view",["exports","libs/toastr","mvc/library/library-model","mvc/library/library-libraryrow-view","libs/underscore"],function(e,r,t,i,s){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var a=l(r),o=l(t),n=l(i),c=l(s),h=Backbone.View.extend({el:"#libraries_element",events:{"click .sort-libraries-link":"sort_clicked"},defaults:{page_count:null,show_page:null,all_fetched:!1},initialize:function(e){this.options=c.default.defaults(this.options||{},e,this.defaults);var r=this;this.modal=null,this.collection=new o.default.Libraries,this.collection.url=this.collection.urlRoot+"?deleted=false",this.collection.fetch({success:function(){r.render()},error:function(e,r){void 0!==r.responseJSON?a.default.error(r.responseJSON.err_msg):a.default.error("An error occurred.")}})},render:function(e){this.options=c.default.extend(this.options,e),this.setElement("#libraries_element");var r=this.templateLibraryList(),t=null,i=null,s=function(e){return!0===e.get("public")};if($(".tooltip").hide(),void 0!==e&&(i=void 0!==e.models?e.models:null),null!==this.collection&&null===i)this.sortLibraries(),t=Galaxy.libraries.preferences.get("with_deleted")?this.collection.models:this.collection.where({deleted:!1}),Galaxy.libraries.preferences.get("without_restricted")&&(t=c.default.filter(t,s));else if(null!==i){if(Galaxy.libraries.preferences.get("with_deleted"))t=i;else{t=c.default.filter(i,function(e){return!1===e.get("deleted")})}Galaxy.libraries.preferences.get("without_restricted")&&(t=c.default.filter(t,s))}else t=[];(null===this.options.show_page||this.options.show_page<1)&&(this.options.show_page=1),this.options.total_libraries_count=t.length;var l=Galaxy.libraries.preferences.get("library_page_size")*(this.options.show_page-1);this.options.page_count=Math.ceil(this.options.total_libraries_count/Galaxy.libraries.preferences.get("library_page_size")),this.options.total_libraries_count>0&&l<this.options.total_libraries_count?(t=t.slice(l,l+Galaxy.libraries.preferences.get("library_page_size")),this.options.libraries_shown=t.length,Galaxy.libraries.preferences.get("library_page_size")*this.options.show_page>this.options.total_libraries_count+Galaxy.libraries.preferences.get("library_page_size")&&(t=[]),this.$el.html(r({length:1,order:Galaxy.libraries.preferences.get("sort_order"),search_term:Galaxy.libraries.libraryToolbarView.options.search_term})),Galaxy.libraries.libraryToolbarView.renderPaginator(this.options),this.renderRows(t)):(this.$el.html(r({length:0,order:Galaxy.libraries.preferences.get("sort_order"),search_term:Galaxy.libraries.libraryToolbarView.options.search_term})),Galaxy.libraries.libraryToolbarView.renderPaginator(this.options)),$("#center [data-toggle]").tooltip(),$("#center").css("overflow","auto")},fetchDeleted:function(){if(this.options.all_fetched)this.render();else{var e=this;this.collection.url=this.collection.urlRoot+"?deleted=true",this.collection.fetch({remove:!1,success:function(){e.options.all_fetched=!0,e.render()},error:function(e,r){void 0!==r.responseJSON?a.default.error(r.responseJSON.err_msg):a.default.error("An error occurred.")}})}},renderRows:function(e){for(var r=0;r<e.length;r++){var t=e[r];this.renderOne({library:t})}},renderOne:function(e){var r=e.library,t=new n.default.LibraryRowView(r);this.$el.find("#library_list_body").append(t.el)},sort_clicked:function(){"asc"===Galaxy.libraries.preferences.get("sort_order")?Galaxy.libraries.preferences.set({sort_order:"desc"}):Galaxy.libraries.preferences.set({sort_order:"asc"}),this.render()},sortLibraries:function(){"name"===Galaxy.libraries.preferences.get("sort_by")&&("asc"===Galaxy.libraries.preferences.get("sort_order")?this.collection.sortLibraries("name","asc"):"desc"===Galaxy.libraries.preferences.get("sort_order")&&this.collection.sortLibraries("name","desc"))},searchLibraries:function(e){if(""!==$.trim(e)){var r=null;r=this.collection.search(e),this.options.searching=!0,this.render({models:r,show_page:1})}else this.options.searching=!1,this.render()},templateLibraryList:function(){return c.default.template(['<div class="library_container table-responsive">',"<% if(length === 0) { %>","<% if(search_term.length > 0) { %>","<div>","There are no libraries matching your search. Try different keyword.","</div>","<% } else{ %>","<div>","There are no libraries visible to you here. If you expected some to show up please consult the",' <a href="https://galaxyproject.org/data-libraries/#permissions" target="_blank">library security wikipage</a>',' or visit the <a href="https://biostar.usegalaxy.org/" target="_blank">Galaxy support site</a>.',"</div>","<% }%>","<% } else{ %>",'<table class="grid table table-condensed">',"<thead>",'<th style="width:30%;">','<a class="sort-libraries-link" title="Click to reverse order" href="#">',"name","</a>",'<span title="Sorted alphabetically" class="fa fa-sort-alpha-<%- order %>"/>',"</th>",'<th style="width:22%;">description</th>','<th style="width:22%;">synopsis</th> ','<th style="width:26%;"></th>',"</thead>",'<tbody id="library_list_body">',"</tbody>","</table>","<% }%>","</div>"].join(""))}});e.default={LibraryListView:h}});