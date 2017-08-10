/*柱图组件对象*/
/*
所有的图表组件都是基于“基本的图文组件H5ComponentBase类”来实现的
*/
var H5ComponentBar = function(name,cfg){
    var component = new H5Component( name,cfg);
    $.each(cfg.data,function(idx,item){
        console.log(cfg.data[idx])
        var line = $('<div class="line"></div>');
        var name = $('<div class="name"></div>');
        var rate = $('<div class="rate"></div>');
        var per = $('<div class="per"></div>');

        if(item[2] !=undefined){
            var bg='style="background-color:'+item[2]+'"';
        }
        rate.html('<div class="bg"'+bg+'></div>');

        var width = item[1]*100+'%';
        rate.css('width',width);
        
        
        per.text(width);

        name.text( item[0] );
        line.append(name).append(rate).append(per);
        component.append(line);
    })

    return component;
}