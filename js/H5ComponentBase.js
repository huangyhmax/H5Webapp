/*基本图文组件交互*/
/*构造函数*/
var H5Component = function(name,cfg){
    var cfg= cfg || {};
    var id=('h5_component'+Math.random()*100).replace('.','_');
    var clsn='h5_component_'+cfg.type+' h5_component_name_'+name;
    var component=$('<div class="h5_component '+clsn+'" id="'+id+'"></div>')
    

    /*如果有cfg.text*/
    cfg.text   && component.text(cfg.text)
    cfg.width  && component.width(cfg.width/2)
    cfg.height && component.height(cfg.height/2)
    // cfg.css && component.css(cfg.css)
    cfg.bg && component.css('backgroundImage','url('+cfg.bg+')')
    if(cfg.center){
        component.css({
            marginLeft:(cfg.width/4*(-1))+'px', /*写margin-left无效，要写为marginLeft*/
            left:'50%'      
        })
    }
    return component;
    
}