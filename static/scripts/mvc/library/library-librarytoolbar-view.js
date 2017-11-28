define("mvc/library/library-librarytoolbar-view",["exports","libs/toastr","mvc/library/library-model"],function(e,a,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var t=r(a),s=r(i),l=Backbone.View.extend({el:"#center",defaults:{search_term:""},events:{"click #create_new_library_btn":"createLibraryFromModal","click #include_deleted_chk":"includeDeletedChecked","click #exclude_restricted_chk":"excludeRestrictedChecked","click .page_size_prompt":"showPageSizePrompt","keyup .library-search-input":"searchLibraries"},initialize:function(e){this.options=_.defaults(this.options||{},e,this.defaults),this.render()},render:function(){var e=this.templateToolBar(),a=!1,i=!0;Galaxy.user&&(a=Galaxy.user.isAdmin(),i=Galaxy.user.isAnonymous()),this.$el.html(e({admin_user:a,anon_user:i})),a&&(this.$el.find("#include_deleted_chk")[0].checked=Galaxy.libraries.preferences.get("with_deleted"),this.$el.find("#exclude_restricted_chk")[0].checked=Galaxy.libraries.preferences.get("without_restricted"))},renderPaginator:function(e){this.options=_.extend(this.options,e);var a=this.templatePaginator();this.$el.find("#library_paginator").html(a({show_page:parseInt(this.options.show_page),page_count:parseInt(this.options.page_count),total_libraries_count:this.options.total_libraries_count,libraries_shown:this.options.libraries_shown,library_page_size:Galaxy.libraries.preferences.get("library_page_size")}))},createLibraryFromModal:function(e){e.preventDefault(),e.stopPropagation();var a=this;this.modal=Galaxy.modal,this.modal.show({closing_events:!0,title:"Create New Library",body:this.templateNewLibraryInModal(),buttons:{Create:function(){a.createNewLibrary()},Close:function(){a.modal.hide()}}})},createNewLibrary:function(){var e=this.serializeNewLibrary();if(this.validateNewLibrary(e)){var a=this;(new s.default.Library).save(e,{success:function(e){Galaxy.libraries.libraryListView.collection.add(e),a.modal.hide(),a.clearLibraryModal(),Galaxy.libraries.libraryListView.render(),t.default.success("Library created.")},error:function(e,a){void 0!==a.responseJSON?t.default.error(a.responseJSON.err_msg):t.default.error("An error occured.")}})}else t.default.error("Library's name is missing.");return!1},showPageSizePrompt:function(e){e.preventDefault();var a=prompt("How many libraries per page do you want to see?",Galaxy.libraries.preferences.get("library_page_size"));null!=a&&a==parseInt(a)&&(Galaxy.libraries.preferences.set({library_page_size:parseInt(a)}),Galaxy.libraries.libraryListView.render({show_page:1}))},clearLibraryModal:function(){$("input[name='Name']").val(""),$("input[name='Description']").val(""),$("input[name='Synopsis']").val("")},serializeNewLibrary:function(){return{name:$("input[name='Name']").val(),description:$("input[name='Description']").val(),synopsis:$("input[name='Synopsis']").val()}},validateNewLibrary:function(e){return""!==e.name},includeDeletedChecked:function(e){e.target.checked?(Galaxy.libraries.preferences.set({with_deleted:!0}),Galaxy.libraries.libraryListView.fetchDeleted()):(Galaxy.libraries.preferences.set({with_deleted:!1}),Galaxy.libraries.libraryListView.render())},excludeRestrictedChecked:function(e){e.target.checked?Galaxy.libraries.preferences.set({without_restricted:!0}):Galaxy.libraries.preferences.set({without_restricted:!1}),Galaxy.libraries.libraryListView.render()},searchLibraries:function(e){var a=$(".library-search-input").val();this.options.search_term=a,Galaxy.libraries.libraryListView.searchLibraries(a)},templateToolBar:function(){return _.template(['<div class="library_style_container">','<div id="toolbar_form">','<div id="library_toolbar">','<form class="form-inline" role="form">','<span><strong><a href="#" title="Go to first page">DATA LIBRARIES</a></strong></span>','<span id="library_paginator" class="library-paginator">',"</span>",'<div class="form-group toolbar-item">','<input type="text" class="form-control library-search-input" placeholder="Search" size="30">',"</div>","<% if(admin_user === true) { %>",'<div class="checkbox toolbar-item" style="height: 20px;">',"<label>",'<input id="include_deleted_chk" type="checkbox">',"include deleted ","</input>","</label>","<label>",'<input id="exclude_restricted_chk" type="checkbox">',"exclude restricted","</input>","</label>","</div>",'<span class="toolbar-item" data-toggle="tooltip" data-placement="top" title="Create New Library">','<button id="create_new_library_btn" class="primary-button btn-xs" type="button"><span class="fa fa-plus"></span> New Library</button>',"</span>","<% } %>",'<span class="help-button" data-toggle="tooltip" data-placement="top" title="See this screen annotated">','<a href="https://galaxyproject.org/data-libraries/screen/list-of-libraries/" target="_blank">','<button class="primary-button" type="button"><span class="fa fa-question-circle"></span> Help</button>',"</a>","</span>","</form>","</div>","</div>",'<div id="libraries_element">',"</div>","</div>"].join(""))},templatePaginator:function(){return _.template(['<ul class="pagination pagination-sm">',"<% if ( ( show_page - 1 ) > 0 ) { %>","<% if ( ( show_page - 1 ) > page_count ) { %>",'<li><a href="#page/1"><span class="fa fa-angle-double-left"></span></a></li>','<li class="disabled"><a href="#page/<% print( show_page ) %>"><% print( show_page - 1 ) %></a></li>',"<% } else { %>",'<li><a href="#page/1"><span class="fa fa-angle-double-left"></span></a></li>','<li><a href="#page/<% print( show_page - 1 ) %>"><% print( show_page - 1 ) %></a></li>',"<% } %>","<% } else { %>",'<li class="disabled"><a href="#page/1"><span class="fa fa-angle-double-left"></span></a></li>','<li class="disabled"><a href="#page/<% print( show_page ) %>"><% print( show_page - 1 ) %></a></li>',"<% } %>",'<li class="active">','<a href="#page/<% print( show_page ) %>"><% print( show_page ) %></a>',"</li>","<% if ( ( show_page ) < page_count ) { %>",'<li><a href="#page/<% print( show_page + 1 ) %>"><% print( show_page + 1 ) %></a></li>','<li><a href="#page/<% print( page_count ) %>"><span class="fa fa-angle-double-right"></span></a></li>',"<% } else { %>",'<li class="disabled"><a href="#page/<% print( show_page  ) %>"><% print( show_page + 1 ) %></a></li>','<li class="disabled"><a href="#page/<% print( page_count ) %>"><span class="fa fa-angle-double-right"></span></a></li>',"<% } %>","</ul>","<span>",' <%- libraries_shown %> libraries shown <a href="" data-toggle="tooltip" data-placement="top" title="currently <%- library_page_size %> per page" class="page_size_prompt">(change)</a>',"</span>","<span>"," <%- total_libraries_count %> total","</span>"].join(""))},templateNewLibraryInModal:function(){return _.template(['<div id="new_library_modal">',"<form>",'<input type="text" name="Name" value="" placeholder="Name" autofocus>','<input type="text" name="Description" value="" placeholder="Description">','<input type="text" name="Synopsis" value="" placeholder="Synopsis">',"</form>","</div>"].join(""))}});e.default={LibraryToolbarView:l}});