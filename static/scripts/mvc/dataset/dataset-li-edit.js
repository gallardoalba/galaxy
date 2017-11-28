define("mvc/dataset/dataset-li-edit",["exports","mvc/dataset/states","mvc/dataset/dataset-li","mvc/tag","mvc/annotation","ui/fa-icon-button","mvc/base-mvc","utils/localization"],function(t,e,a,i,n,r,o,s){"use strict";function l(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var d=l(e),u=l(a),c=l(i),f=l(n),h=l(r),g=l(o),m=l(s),p=u.default.DatasetListItemView,v=p.extend({initialize:function(t){p.prototype.initialize.call(this,t),this.hasUser=t.hasUser,this.purgeAllowed=t.purgeAllowed||!1,this.tagsEditorShown=t.tagsEditorShown||!1,this.annotationEditorShown=t.annotationEditorShown||!1},_renderPrimaryActions:function(){var t=p.prototype._renderPrimaryActions.call(this);return this.model.get("state")===d.default.NOT_VIEWABLE?t:p.prototype._renderPrimaryActions.call(this).concat([this._renderEditButton(),this._renderDeleteButton()])},_renderEditButton:function(){var t=this;if(this.model.get("state")===d.default.DISCARDED||!this.model.get("accessible"))return null;var e=this.model.get("purged"),a=this.model.get("deleted"),i={title:(0,m.default)("Edit attributes"),href:Galaxy.root+"datasets/edit?dataset_id="+this.model.attributes.id,faIcon:"fa-pencil",classes:"edit-btn",onclick:function(e){Galaxy.router&&(e.preventDefault(),Galaxy.router.push("datasets/edit",{dataset_id:t.model.attributes.id}))}};return a||e?(i.disabled=!0,e?i.title=(0,m.default)("Cannot edit attributes of datasets removed from disk"):a&&(i.title=(0,m.default)("Undelete dataset to edit attributes"))):_.contains([d.default.UPLOAD,d.default.NEW],this.model.get("state"))&&(i.disabled=!0,i.title=(0,m.default)("This dataset is not yet editable")),(0,h.default)(i)},_renderDeleteButton:function(){if(!this.model.get("accessible"))return null;var t=this,e=this.model.isDeletedOrPurged();return(0,h.default)({title:e?(0,m.default)("Dataset is already deleted"):(0,m.default)("Delete"),disabled:e,faIcon:"fa-times",classes:"delete-btn",onclick:function(){t.$el.find(".icon-btn.delete-btn").trigger("mouseout"),t.model.delete()}})},_renderDetails:function(){var t=p.prototype._renderDetails.call(this),e=this.model.get("state");return!this.model.isDeletedOrPurged()&&_.contains([d.default.OK,d.default.FAILED_METADATA],e)&&(this._renderTags(t),this._renderAnnotation(t),this._makeDbkeyEditLink(t)),this._setUpBehaviors(t),t},_renderToolHelpButton:function(){var t=this.model.attributes.dataset_id,e=this.model.attributes.creating_job,a=this,i=function(e){var i='<div id="thdiv-'+t+'" class="toolhelp">';e.name&&e.help?(i+="<strong>Tool help for "+e.name+"</strong><hr/>",i+=e.help):i+="<strong>Tool help is unavailable for this dataset.</strong><hr/>",i+="</div>",a.$el.find(".details").append($.parseHTML(i))},n=function(t){$.ajax({url:Galaxy.root+"api/tools/"+t.tool_id+"/build"}).done(function(t){i(t)}).fail(function(){i({})})};return null===Galaxy.user.id?null:(0,h.default)({title:(0,m.default)("Tool Help"),classes:"icon-btn",href:"#",faIcon:"fa-question",onclick:function(){a.$el.find(".toolhelp").length>0?a.$el.find(".toolhelp").toggle():$.ajax({url:Galaxy.root+"api/jobs/"+e}).done(function(t){n(t)}).fail(function(){console.log('Failed at recovering job information from the  Galaxy API for job id "'+e+'".')})}})},_renderSecondaryActions:function(){var t=p.prototype._renderSecondaryActions.call(this);switch(this.model.get("state")){case d.default.UPLOAD:case d.default.NOT_VIEWABLE:return t;case d.default.ERROR:return t.unshift(this._renderErrButton()),t.concat([this._renderRerunButton(),this._renderToolHelpButton()]);case d.default.OK:case d.default.FAILED_METADATA:return t.concat([this._renderRerunButton(),this._renderVisualizationsButton(),this._renderToolHelpButton()])}return t.concat([this._renderRerunButton(),this._renderToolHelpButton()])},_renderErrButton:function(){var t=this;return(0,h.default)({title:(0,m.default)("View or report this error"),href:Galaxy.root+"datasets/error?dataset_id="+this.model.attributes.id,classes:"report-error-btn",faIcon:"fa-bug",onclick:function(e){Galaxy.router&&(e.preventDefault(),Galaxy.router.push("datasets/error",{dataset_id:t.model.attributes.id}))}})},_renderRerunButton:function(){var t=this.model.get("creating_job");if(this.model.get("rerunnable"))return(0,h.default)({title:(0,m.default)("Run this job again"),href:this.model.urls.rerun,classes:"rerun-btn",target:this.linkTarget,faIcon:"fa-refresh",onclick:function(e){Galaxy.router&&(e.preventDefault(),Galaxy.router.push("/",{job_id:t}))}})},_renderVisualizationsButton:function(){var t=this.model.get("visualizations");if(this.model.isDeletedOrPurged()||!this.hasUser||!this.model.hasData()||_.isEmpty(t))return null;if(!_.isObject(t[0]))return this.warn("Visualizations have been switched off"),null;var e=$(this.templates.visualizations(t,this));return e.find('[target="galaxy_main"]').attr("target",this.linkTarget),this._addScratchBookFn(e.find(".visualization-link").addBack(".visualization-link")),e},_addScratchBookFn:function(t){t.click(function(t){Galaxy.frame&&Galaxy.frame.active&&(Galaxy.frame.add({title:"Visualization",url:$(this).attr("href")}),t.preventDefault(),t.stopPropagation())})},_renderTags:function(t){if(this.hasUser){var e=this;this.tagsEditor=new c.default.TagsEditor({model:this.model,el:t.find(".tags-display"),onshowFirstTime:function(){this.render()},onshow:function(){e.tagsEditorShown=!0},onhide:function(){e.tagsEditorShown=!1},$activator:(0,h.default)({title:(0,m.default)("Edit dataset tags"),classes:"tag-btn",faIcon:"fa-tags"}).appendTo(t.find(".actions .right"))}),this.tagsEditorShown&&this.tagsEditor.toggle(!0)}},_renderAnnotation:function(t){if(this.hasUser){var e=this;this.annotationEditor=new f.default.AnnotationEditor({model:this.model,el:t.find(".annotation-display"),onshowFirstTime:function(){this.render()},onshow:function(){e.annotationEditorShown=!0},onhide:function(){e.annotationEditorShown=!1},$activator:(0,h.default)({title:(0,m.default)("Edit dataset annotation"),classes:"annotate-btn",faIcon:"fa-comment"}).appendTo(t.find(".actions .right"))}),this.annotationEditorShown&&this.annotationEditor.toggle(!0)}},_makeDbkeyEditLink:function(t){if("?"===this.model.get("metadata_dbkey")&&!this.model.isDeletedOrPurged()){var e=$('<a class="value">?</a>').attr("href",this.model.urls.edit).attr("target","_top");t.find(".dbkey .value").replaceWith(e)}},events:_.extend(_.clone(p.prototype.events),{"click .undelete-link":"_clickUndeleteLink","click .purge-link":"_clickPurgeLink","click .edit-btn":function(t){this.trigger("edit",this,t)},"click .delete-btn":function(t){this.trigger("delete",this,t)},"click .rerun-btn":function(t){this.trigger("rerun",this,t)},"click .report-err-btn":function(t){this.trigger("report-err",this,t)},"click .visualization-btn":function(t){this.trigger("visualize",this,t)},"click .dbkey a":function(t){this.trigger("edit",this,t)}}),_clickUndeleteLink:function(t){return this.model.undelete(),!1},_clickPurgeLink:function(t){return confirm((0,m.default)("This will permanently remove the data in your dataset. Are you sure?"))&&this.model.purge(),!1},toString:function(){return"HDAEditView("+(this.model?""+this.model:"(no model)")+")"}});v.prototype.templates=function(){var t=_.extend({},p.prototype.templates.warnings,{failed_metadata:g.default.wrapTemplate(['<% if( dataset.state === "failed_metadata" ){ %>','<div class="failed_metadata-warning warningmessagesmall">',(0,m.default)("An error occurred setting the metadata for this dataset"),'<br /><a href="<%- dataset.urls.edit %>" target="_top">',(0,m.default)("Set it manually or retry auto-detection"),"</a>","</div>","<% } %>"],"dataset"),deleted:g.default.wrapTemplate(["<% if( dataset.deleted && !dataset.purged ){ %>",'<div class="deleted-msg warningmessagesmall">',(0,m.default)("This dataset has been deleted"),'<br /><a class="undelete-link" href="javascript:void(0);">',(0,m.default)("Undelete it"),"</a>","<% if( view.purgeAllowed ){ %>",'<br /><a class="purge-link" href="javascript:void(0);">',(0,m.default)("Permanently remove it from disk"),"</a>","<% } %>","</div>","<% } %>"],"dataset")}),e=g.default.wrapTemplate(["<% if( visualizations.length === 1 ){ %>",'<a class="visualization-link icon-btn" href="<%- visualizations[0].href %>"',' target="<%- visualizations[0].target %>" title="',(0,m.default)("Visualize in"),' <%- visualizations[0].html %>">','<span class="fa fa-bar-chart-o"></span>',"</a>","<% } else { %>",'<div class="visualizations-dropdown dropdown icon-btn">','<a data-toggle="dropdown" title="',(0,m.default)("Visualize"),'">','<span class="fa fa-bar-chart-o"></span>',"</a>",'<ul class="dropdown-menu" role="menu">',"<% _.each( visualizations, function( visualization ){ %>",'<li><a class="visualization-link" href="<%- visualization.href %>"',' target="<%- visualization.target %>">',"<%- visualization.html %>","</a></li>","<% }); %>","</ul>","</div>","<% } %>"],"visualizations");return _.extend({},p.prototype.templates,{warnings:t,visualizations:e})}(),t.default={DatasetListItemEdit:v}});