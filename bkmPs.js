/*<![CDATA[*/
/*Bkm*/
var txBkm1 = 'Bookmark Post';
var txBkm2 = 'The list of favorite posts does not exist yet...';
var txBkm3 = 'View all posts';
var icBkm1 = '<svg viewBox="0 0 16 16"><path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"></path><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path></svg>';
var icBkm2 = '<svg viewBox="0 0 24 24"><path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.5 6.5,20.5C8.45,20.5 10.55,20.9 12,22C13.35,21.15 15.8,20.5 17.5,20.5C19.15,20.5 20.85,20.81 22.25,21.56C22.35,21.61 22.4,21.59 22.5,21.59C22.75,21.59 23,21.34 23,21.09V6.5C22.4,6.05 21.75,5.75 21,5.5V7.5L21,13V19C19.9,18.65 18.7,18.5 17.5,18.5C15.8,18.5 13.35,19.15 12,20V13L12,8.5V6.5C10.55,5.4 8.45,5 6.5,5V5Z"></path></svg>';
var icBkm3 = '<svg class="line" viewBox="0 0 24 24"><g transform="translate(3.500000, 2.000000)"><path d="M15.3891429,7.55409524 C15.3891429,15.5731429 16.5434286,19.1979048 8.77961905,19.1979048 C1.01485714,19.1979048 2.19295238,15.5731429 2.19295238,7.55409524"></path><line x1="16.8651429" y1="4.47980952" x2="0.714666667" y2="4.47980952"></line><path d="M12.2148571,4.47980952 C12.2148571,4.47980952 12.7434286,0.714095238 8.78914286,0.714095238 C4.83580952,0.714095238 5.36438095,4.47980952 5.36438095,4.47980952"></path></g></svg>';

/*nav BmPs*/qSel('#TextList000 > .headIc').insertAdjacentHTML('afterbegin', '<li class="isBkm"><label aria-label="Bookmark" class="tBkmt tIc bIc n" for="offBkm">'+icBkm1+'</label></li>');

/*content BmPs*/getid('header-icon').insertAdjacentHTML('beforeend', '<div class="cBkPs"><input class="bkmI hidden" id="offBkm" type="checkbox"/><div class="wBkm sl"><div class="bkmS fixLs"><div class="bkmH fixH fixT" data-text="'+txBkm1+'"><label aria-label="Close" class="c cl" for="offBkm"></label></div><div id="dBmPs" class="bkmC"></div></div></div><label class="bkmCls" for="offBkm"></label></div>');

/* set obj LS Bookmark, value*/ 
const LS_BM_PS='Bookmark_Post'; let objBmPs={}, giBmPs=xAR.gLS(LS_BM_PS);

/*null BkmPs*/function nBkmPs(){getid('dBmPs').innerHTML='<div class="n">'+icBkm2+'<p>'+txBkm2+'</p><a class="button" href="/search">'+txBkm3+'</a></div>'}

/*get result BmPs */
function gBmPs(idBm,oBm){var idBP=oBm['id'],ttlBP=oBm['title'],imgBP=oBm['image'],urlBP=oBm['link']; if(getid('dBmPs')!==null){getid('dBmPs').innerHTML+='<div class="item" id="bkm'+idBP+'"><div class="pThmb"><div class="thmb"><div class="bkmImg" style="background-image:url(\''+imgBP+'\');"></div></div></div><div class="itmTtl"><a href="'+urlBP+'">'+ttlBP+'</a></div><div class="del" onclick="delBmPs(\''+idBP+'\')">'+icBkm3+'</div></div>'} var bBmPs='.bmPs[bm-id="'+idBP+'"]';qSell(bBmPs).forEach(item=>{item.classList.add('a')});}

/*refresh BkmPs*/function rBmPs(){getid('dBmPs').innerHTML='';if(xAR.gLS(LS_BM_PS)){objBmPs=JSON.parse(xAR.gLS(LS_BM_PS));for(let key in objBmPs)gBmPs(key,objBmPs[key]);var cBmPs=Object.keys(objBmPs).length;if(cBmPs>0){qSel('.tBkmt').setAttribute('data-text',cBmPs);qSel('.tBkmt').classList.remove('n')}else{qSel('.tBkmt').classList.add('n');nBkmPs()}}}

/*crud stu value*/function synBmPs(act,id,ttl,img,url){switch(act){case'ADD':case'UPD':if(xAR.gLS(LS_BM_PS)){objBmPs=JSON.parse(xAR.gLS(LS_BM_PS))}var newIns={'id':id,'title':ttl,'image':img,'link':url};objBmPs[newIns.id]=newIns;break;case'DEL':delete objBmPs[id];var bBmPs='.bmPs[bm-id="'+id+'"]';qSell(bBmPs).forEach(item=>{item.classList.remove('a')});break;default:break}xAR.sLS(LS_BM_PS,JSON.stringify(objBmPs));rBmPs();return}

/*load LS*/if(giBmPs){rBmPs()}else{nBkmPs()}

/*set result item value*/qSell('.bmPs').forEach(item=>{item.addEventListener('click',event=>{var bm_id=item.getAttribute('bm-id'),bm_ttl=item.getAttribute('bm-ttl'),bm_img=item.getAttribute('bm-img'),bm_url=item.getAttribute('bm-url');if(xAR.gLS(LS_BM_PS)){objBmPs=JSON.parse(xAR.gLS(LS_BM_PS));var valDATA=objBmPs[bm_id];if(valDATA==undefined){synBmPs('ADD',bm_id,bm_ttl,bm_img,bm_url)}else{synBmPs('DEL',bm_id)}}else{synBmPs('ADD',bm_id,bm_ttl,bm_img,bm_url)}})});

/*del BmPs*/function delBmPs(idPs){if(xAR.gLS(LS_BM_PS)){objBmPs=JSON.parse(xAR.gLS(LS_BM_PS));var valDATA=objBmPs[idPs];if(valDATA!=undefined){var idBkmPs='bkm'+idPs;getid(idBkmPs).classList.add('d');setTimeout(function(){synBmPs('DEL',idPs)},1000)}}}
/*]]>*/
