const assert      = require('assert');
const _           = require('lodash');
const fs          = require('fs');
const request     = require('sync-request');
const jsPackTools = require('js-packtools');
//const compressing = require('compressing');

require('dotenv').config();

let u = new jsPackTools({folderName:__dirname+'/log'});

let data = ['jasp402'];


    describe('webdriver.io page', () => {
    it('deberia, Entrar en Instagram', () => {
        browser.url('https://www.instagram.com/accounts/login/');
        u.logExecution('--- Entro a instagram');
        // browser.pause(60000);
        //$('iframe[name="fb_xdm_frame_https"]').waitForExist();



        $('input[name="password"]').waitForExist(3000);
        console.log($('input[name="password"]'));
        $('input[name="password"]').setValue(process.env.PASS);
        $('input[name="username"]').setValue(process.env.USER);
        $('button[type="submit"]').click();

        browser.pause(10000);
    });

    data.forEach(account => {
        it('deberia, scraping account: ' + account, () => {
            extractImages(account);
        });
    });
});

function extractImages(account) {

    let cord;           //coordenadas inicial
    let currentCord;    //Cordenadas actual

    browser.url('https://www.instagram.com/' + account + '/');
    u.logExecution(browser.getTitle());

    /** Lista las imagenes **/
    $('.DINPA').waitForExist(6000); //Logo de instagram

    let item        = $('.DINPA');
    const DIV_POST  = '//*[@id="react-root"]/section/main/div/header/section/ul/li[1]/span';
    let post        = $(DIV_POST).getText();

    u.logExecution(post);

    let getImgSrcAttr = [];
    /*
    browser.waitUntil(function () {
    }, 600000, 'error nuca llega ha ser igual durante 60 seg.');
    */
    let withfot = true;
    while(withfot){
        cord = browser.getElementLocation(item.ELEMENT);
        item.scrollIntoView();

        browser.pause(4000);


        currentCord = browser.getElementLocation(item.ELEMENT);
        if (currentCord !== undefined && currentCord.y === cord.y) {
            withfot = false;
        }else{
            $$('article img').forEach(img => {
                //browser.pause(1000);
                getImgSrcAttr.push(img.getAttribute('src'));
            });
        }
    }

    getImgSrcAttr = _.uniq(_.flattenDeep(getImgSrcAttr));
    u.logExecution(getImgSrcAttr.length+' Descargado');
    //u.logExecution(JSON.stringify(getImgSrcAttr));
    //console.log(JSON.stringify(getImgSrcAttr));

    /** Extrar URLs

    cordY.forEach(x => {
        $('.DINPA').scroll(0, x);

        console.log(x);

        //getImgSrcAttr.push();
        browser.pause(1000);

        $$('article img').forEach(img => {
            //browser.pause(1000);
            getImgSrcAttr.push(img.getAttribute('src'));
        });
        getImgSrcAttr = _.uniq(getImgSrcAttr);
        browser.pause(1000);

        //getImgSrcAttr = _.uniq(_.flattenDeep(getImgSrcAttr));
    });
     **/

    let COOKIES = browser.getCookies();
    let arrayCookies = [];
    COOKIES.forEach(function (cookie) {
        arrayCookies.push(cookie.name + '=' + cookie.value);
    });
    arrayCookies = arrayCookies.join(';');
    getImgSrcAttr.forEach((imgUrl, index) => {
        let res = request('GET', imgUrl, {
            'headers': {
                'Cookie': arrayCookies
            }
        });
        dir = __dirname + '/images/' + account + '/';
        u.validateDir(dir);
        fs.writeFileSync(dir + index + '.jpg', res.getBody());
        //compressing.gzip.compressFile(dir, __dirname + '/images/account.zip')
    });
}