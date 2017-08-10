/*基本图文组件*/
/*构造函数*/
var H5Component = function(name,cfg){
    var cfg= cfg || {};
    var id=('h5_component'+Math.random()*100).replace('.','_');
    var clsn='h5_component_name_'+name+' h5_component_'+cfg.type;
    var component=$('<div class="h5_component '+clsn+'" id="'+id+'"></div>')
    /*如果有cfg.text*/
    cfg.text   && component.text(cfg.text)
    cfg.width  && component.width(cfg.width/2)
    cfg.height && component.height(cfg.height/2)
    cfg.css && component.css(cfg.css)
    cfg.bg && component.css('backgroundImage','url('+cfg.bg+')')
    if(cfg.center){
        component.css({
            marginLeft:(cfg.width/4*(-1))+'px', /*写margin-left无效，要写为marginLeft*/
            left:'50%'      
        })
    }
    /*让基本图文组件绑定onLoad和onLeave事件*/
    component.on('onLoad',function(){
        $(this).addClass(clsn+' h5_component_Load').removeClass(' h5_component_Leave');
        cfg.animateIn && $(this).animate(cfg.animateIn);
        return false; //避免在page的调用触发中，陷入无限死循环
    })
    component.on('onLeave',function(){
        $(this).addClass(clsn+' h5_component_Leave').removeClass(' h5_component_Load');
        cfg.animateOut && $(this).animate(cfg.animateOut);
        return false;
    })
    return component;
    
}