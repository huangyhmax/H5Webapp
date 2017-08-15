/*饼图组件对象*/
/*
所有的图表组件都是基于“基本的图文组件H5ComponentBase类”来实现的
*/
var H5ComponentPie = function(name,cfg){
    var component = new H5Component( name,cfg);

    var w=cfg.width;
    var h=cfg.height;
    //插入canvans的画布（网格线背景）,以下为固定写法
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width =w;
    cns.height = ctx.height =h;
    $(cns).css('zIndex',1);
    component.append(cns);
    
    var r=w/2;
    //绘制饼图的底层
    ctx.beginPath();
    ctx.fillStyle='#eee';/*填充颜色*/
    ctx.strokeStyle='#eee';/*边线颜色*/
    ctx.lineWidth=1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

    //绘制一个数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width =w;
    cns.height = ctx.height =h;
    $(cns).css('zIndex',2);
    component.append(cns);
    
    var colors=['red','green','blue','gray','orange'];
    var sAngel = 1.5 * Math.PI; //设置开始的角度在12点方位
    var eAngel =0;  //结束角度
    var aAngel = Math.PI*2; //100%的圆结束的角度 360度

    var step = cfg.data.length;
    for(var i=0;i<step;i++){
        var item = cfg.data[i];
        var color = item[2] || ( item[2]=colors.pop());
        //角度的累加
        eAngel=sAngel+aAngel*item[1];
        ctx.beginPath();
        ctx.fillStyle=color;/*填充颜色*/
        ctx.strokeStyle=color;/*边线颜色*/
        ctx.lineWidth=.1;
        ctx.moveTo(r,r);
        ctx.arc(r,r,r,sAngel,eAngel);
        ctx.fill();
        ctx.stroke();
        sAngel=eAngel;

        var text = $('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        var per=$('<div class="per"></div>');
        per.text(cfg.data[i][1]*100+'%');
        text.append(per);

        var x=r+Math.sin(.5*Math.PI-sAngel)*r;
        var y=r+Math.cos(.5*Math.PI-sAngel)*r;

        // text.css('left',x/2);
        // text.css('top',y/2);

        if(x>w/2){
            text.css('left',x/2);
        }else{
            text.css('right',(w-x)/2);
        }

        if(y>h/2){
            text.css('top',y/2);
        }else{
            text.css('bottom',(h-y)/2);
        }

        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2])
        }

        text.css('opacity',0);
        component.append(text);
       }


       //加入一个蒙板层
        var cns = document.createElement('canvas');
        var ctx = cns.getContext('2d');
        cns.width = ctx.width =w;
        cns.height = ctx.height =h;
        $(cns).css('zIndex',3);
        component.append(cns);
        // var r=w/2;
        //绘制饼图的底层
        ctx.fillStyle='#eee';/*填充颜色*/
        ctx.strokeStyle='#eee';/*边线颜色*/
        ctx.lineWidth=1;
        

    var draw = function(per){

       
        // if(per<=0){
        //     component.find('.text').css('opacity',0);
        // }

        ctx.clearRect(0,0,w,h);

        ctx.beginPath();
        ctx.moveTo(r,r);
        // ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per);
        if(per<=0){
            ctx.arc(r,r,r,0,2*Math.PI);
            component.find('.text').css('opacity',0);
            //加上true的话，就会反过来从颜色变为灰色
        }else{
            ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
        }
        
        ctx.fill();
        ctx.stroke();
        if(per>=1){
            component.find('.text').css('opacity',1);            
        }
    }
     draw(0);
    component.on('onLoad',function(){
        //饼图生长动画
        var s=0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                 draw(s);
            },i*10)
        }
        // [0,10,20,30,。。。]动画时间数组
    })
    component.on('onLeave',function(){
         //饼图消失动画
         var s=1;
         for(var i=0;i<100;i++){
             setTimeout(function(){
                 s-=.01;
                  draw(s);
             },i*10)
         }
    })
    return component;
}