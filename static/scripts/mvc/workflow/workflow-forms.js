define("mvc/workflow/workflow-forms",["exports","utils/utils","mvc/form/form-view","mvc/tool/tool-form-base"],function(e,t,a,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e){var t=e.model.attributes,a=t.workflow,o=t.node;t.inputs.unshift({type:"text",name:"__annotation",label:"Annotation",fixed:!0,value:o.annotation,area:!0,help:"Add an annotation or notes to this step. Annotations are available when a workflow is viewed."}),t.inputs.unshift({type:"text",name:"__label",label:"Label",value:o.label,help:"Add a step label.",fixed:!0,onchange:function(t){var n=!1;for(var i in a.nodes){var l=a.nodes[i];if(l.label&&l.label==t&&l.id!=o.id){n=!0;break}}var r=e.data.match("__label");e.element_list[r].model.set("error_text",n&&"Duplicate label. Please fix this before saving the workflow."),e.trigger("change")}})}function l(e,t,a,o){var n=o.node.post_job_actions;(t=t||[]).push(e);for(var i in e.inputs){var r=e.inputs[i];if(r.action){if(r.name="pja__"+a+"__"+r.action,r.pja_arg&&(r.name+="__"+r.pja_arg),r.payload)for(var s in r.payload)r.payload[r.name+"__"+s]=r.payload[s],delete r.payload[s];var u=n[r.action+a];if(u){for(var p in t)t[p].expanded=!0;r.pja_arg?r.value=u.action_arguments&&u.action_arguments[r.pja_arg]||r.value:r.value="true"}}r.inputs&&l(r,t.slice(0),a,o)}}function r(e,t){var a=[],o=[],n=t.datatypes,i=t.node,r=t.workflow;for(var s in n)a.push({0:n[s],1:n[s]});for(s in i.input_terminals)o.push(i.input_terminals[s].name);a.sort(function(e,t){return e.label>t.label?1:e.label<t.label?-1:0}),a.unshift({0:"Sequences",1:"Sequences"}),a.unshift({0:"Roadmaps",1:"Roadmaps"}),a.unshift({0:"Leave unchanged",1:"__empty__"});var u,p={title:"Configure Output: '"+e+"'",type:"section",flat:!0,inputs:[{label:"Label",type:"text",value:(u=i.getWorkflowOutput(e))&&u.label||"",help:"This will provide a short name to describe the output - this must be unique across workflows.",onchange:function(t){r.attemptUpdateOutputLabel(i,e,t)}},{action:"RenameDatasetAction",pja_arg:"newname",label:"Rename dataset",type:"text",value:"",ignore:"",help:'This action will rename the output dataset. Click <a href="https://galaxyproject.org/learn/advanced-workflow/variables/">here</a> for more information. Valid inputs are: <strong>'+o.join(", ")+"</strong>."},{action:"ChangeDatatypeAction",pja_arg:"newtype",label:"Change datatype",type:"select",ignore:"__empty__",value:"__empty__",options:a,help:"This action will change the datatype of the output to the indicated value."},{action:"TagDatasetAction",pja_arg:"tags",label:"Add Tags",type:"text",value:"",ignore:"",help:"This action will set tags for the dataset."},{action:"RemoveTagDatasetAction",pja_arg:"tags",label:"Remove Tags",type:"text",value:"",ignore:"",help:"This action will remove tags for the dataset."},{title:"Assign columns",type:"section",flat:!0,inputs:[{action:"ColumnSetAction",pja_arg:"chromCol",label:"Chrom column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",pja_arg:"startCol",label:"Start column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",pja_arg:"endCol",label:"End column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",pja_arg:"strandCol",label:"Strand column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",pja_arg:"nameCol",label:"Name column",type:"integer",value:"",ignore:""}],help:"This action will set column assignments in the output dataset. Blank fields are ignored."}]};return l(p,[],e,t),p}function s(e){var t=e.model.attributes,a=t.inputs,o=t.node,n=o.post_job_actions,i=o.output_terminals&&Object.keys(o.output_terminals)[0];if(i){a.push({name:"pja__"+i+"__EmailAction",label:"Email notification",type:"boolean",value:String(Boolean(n["EmailAction"+i])),ignore:"false",help:"An email notification will be sent when the job has completed.",payload:{host:window.location.host}}),a.push({name:"pja__"+i+"__DeleteIntermediatesAction",label:"Output cleanup",type:"boolean",value:String(Boolean(n["DeleteIntermediatesAction"+i])),ignore:"false",help:"Upon completion of this step, delete non-starred outputs from completed workflow steps if they are no longer required as inputs."});for(var l in o.output_terminals)a.push(r(l,t))}}Object.defineProperty(e,"__esModule",{value:!0});var u=n(t),p=n(a),d=n(o),c=Backbone.View.extend({initialize:function(e){var t=this,a=e.node;this.form=new p.default(u.default.merge(e,{onchange:function(){u.default.request({type:"POST",url:Galaxy.root+"api/workflows/build_module",data:{id:a.id,type:a.type,content_id:a.content_id,inputs:t.form.data.create()},success:function(e){a.update_field_data(e)}})}})),i(this.form),this.form.render()}}),f=Backbone.View.extend({initialize:function(e){var t=this,a=e.node;this.form=new d.default(u.default.merge(e,{text_enable:"Set in Advance",text_disable:"Set at Runtime",narrow:!0,initial_errors:!0,cls:"ui-portlet-narrow",initialmodel:function(e,a){t._customize(a),e.resolve()},buildmodel:function(e,t){t.model.get("postchange")(e,t)},postchange:function(e,o){var n=o.model.attributes,i={tool_id:n.id,tool_version:n.version,type:"tool",inputs:$.extend(!0,{},o.data.create())};Galaxy.emit.debug("tool-form-workflow::postchange()","Sending current state.",i),u.default.request({type:"POST",url:Galaxy.root+"api/workflows/build_module",data:i,success:function(n){o.model.set(n.config_form),t._customize(o),o.update(n.config_form),o.errors(n.config_form),a.update_field_data(n),Galaxy.emit.debug("tool-form-workflow::postchange()","Received new model.",n),e.resolve()},error:function(t){Galaxy.emit.debug("tool-form-workflow::postchange()","Refresh request failed.",t),e.reject()}})}}))},_customize:function(e){var t=e.model.attributes;u.default.deepeach(t.inputs,function(e){e.type&&(-1!=["data","data_collection"].indexOf(e.type)?(e.type="hidden",e.info="Data input '"+e.name+"' ("+u.default.textify(e.extensions)+")",e.value={__class__:"RuntimeValue"}):e.fixed||(e.collapsible_value={__class__:"RuntimeValue"},e.is_workflow=e.options&&0===e.options.length||-1!=["integer","float"].indexOf(e.type)))}),u.default.deepeach(t.inputs,function(e){"conditional"===e.type&&(e.test_param.collapsible_value=void 0)}),s(e),i(e)}});e.default={Default:c,Tool:f}});