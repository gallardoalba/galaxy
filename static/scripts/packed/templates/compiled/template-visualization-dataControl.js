(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-visualization-dataControl"]=b(function(g,m,f,l,k){this.compilerInfo=[2,">= 1.0.0-rc.3"];f=f||g.helpers;k=k||{};var i="",d,h="function",j=this.escapeExpression,n=this;function e(r,q){var o="",p;o+='\n            <option value="';if(p=f.index){p=p.call(r,{hash:{},data:q})}else{p=r.index;p=typeof p===h?p.apply(r):p}o+=j(p)+'">';if(p=f.name){p=p.call(r,{hash:{},data:q})}else{p=r.name;p=typeof p===h?p.apply(r):p}o+=j(p)+"</option>\n        ";return o}function c(p,o){return'checked="true"'}i+='<p class="help-text">\n        Use the following controls to change the data used by the chart.\n        Use the \'Draw\' button to render (or re-render) the chart with the current settings.\n    </p>\n\n    \n    <div class="column-select">\n        <label for="X-select">Data column for X: </label>\n        <select name="X" id="X-select">\n        ';d=f.each.call(m,m.numericColumns,{hash:{},inverse:n.noop,fn:n.program(1,e,k),data:k});if(d||d===0){i+=d}i+='\n        </select>\n    </div>\n    <div class="column-select">\n        <label for="Y-select">Data column for Y: </label>\n        <select name="Y" id="Y-select">\n        ';d=f.each.call(m,m.numericColumns,{hash:{},inverse:n.noop,fn:n.program(1,e,k),data:k});if(d||d===0){i+=d}i+='\n        </select>\n    </div>\n\n    \n    <div id="include-id">\n        <label for="include-id-checkbox">Include a third column as data point IDs?</label>\n        <input type="checkbox" name="include-id" id="include-id-checkbox" />\n        <p class="help-text-small">\n            These will be displayed (along with the x and y values) when you hover over\n            a data point.\n        </p>\n    </div>\n    <div class="column-select" style="display: none">\n        <label for="ID-select">Data column for IDs: </label>\n        <select name="ID" id="ID-select">\n        ';d=f.each.call(m,m.allColumns,{hash:{},inverse:n.noop,fn:n.program(1,e,k),data:k});if(d||d===0){i+=d}i+='\n        </select>\n    </div>\n\n    \n    <div id="first-line-header" style="display: none;">\n        <p>Possible headers: ';if(d=f.possibleHeaders){d=d.call(m,{hash:{},data:k})}else{d=m.possibleHeaders;d=typeof d===h?d.apply(m):d}i+=j(d)+'\n        </p>\n        <label for="first-line-header-checkbox">Use the above as column headers?</label>\n        <input type="checkbox" name="include-id" id="first-line-header-checkbox"\n            ';d=f["if"].call(m,m.usePossibleHeaders,{hash:{},inverse:n.noop,fn:n.program(3,c,k),data:k});if(d||d===0){i+=d}i+='/>\n        <p class="help-text-small">\n            It looks like Galaxy couldn\'t get proper column headers for this data.\n            Would you like to use the column headers above as column names to select columns?\n        </p>\n    </div>\n\n    <input id="render-button" type="button" value="Draw" />\n    <div class="clear"></div>';return i})})();