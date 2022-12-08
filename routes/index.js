var express = require('express');
var router = express.Router();
const cookieParser = require("cookie-parser");
const models = require("../models");
const fs = require('fs');
/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const airplane = await models.airplane.findAll({});
        console.log("1111->", airplane);
        res.send(airplane);

    } catch (err) {
        console.error(err);
        next(err);
    }
    res.render('index', {title: 'Express'});
});


router.get('/api/airplane/:id', async function (req, res, next) {
    try {
        let searchAirplane = req.params.id;
        console.log("222->", searchAirplane);
        const airplane = await models.airplane.findOne({
            where: {
                id: searchAirplane
            }
        });
        console.log("1111->", airplane);
        res.send(airplane);

    } catch (err) {
        console.error(err);
        next(err);
    }
    res.render('index', {title: 'Express'});
});

router.get('/displayFile/:whichOne', async (req, res, next)=>{
    const choice = req.params.whichOne;
    const query = req.query.filename;
    const base_dir = "/home/edu07/IdeaProjects/tourlandd/public/displayFile";

    let path;
    if(choice === "popup"){
        path = base_dir+"/popup"+ query;
    }
    else if(choice === "banner"){
        path = base_dir+"/banner"+ query;
    }
    else if(choice === "event"){
        path = base_dir+"/event"+ query;
    }
    else if(choice === "product" || (choice === "productSmall")){
        path = base_dir+"/product"+ query;
    }
    else if(choice === "practice"){
        path = "";
    }
    else{
        console.log("이미지 종류가 없네요 확인 요망");
    }

    fs.createReadStream(path).pipe(res);

})

router.get('/customer', async (req, res, next) => {

    const currentProductPrice = {};
    const currentProductPrice2 = {};
    const currentProduct = {};
    const currentProduct2 = {};

    const popup1 = await models.popup.findOne({
        raw: true,
        where: {
            position: 'R'
        }
    });

    // const aaa = popup1.map((p) => p.get('pic'));

    console.log('ppp->', popup1.pic);
    const startDate = new Date(popup1.enddate) - new Date(popup1.startdate);
    const endDate = Math.abs(startDate / (24 * 60 * 60 * 1000));
    console.log('startdate ->', startDate);
    console.log('enddate ->', endDate);

    const cookieConfig = {
        //cookieConfig는 키, 밸류 외에 설정을 보낼 수 있다.
        // maxAge: endDate * 24 * 60 * 60,
        expires: new Date(Date.now() + endDate*24*60*60),
        //밀리초 단위로 들어가는데 30000을 설정하면 30초만료 쿠키를 생성한다.
        path: '/',
        // httpOnly: true,
        //통신할때만 접속할 수 있다. 기본값은 false임
        signed: true,
        //쿠키를 암호화 시킨다.
    };

    res.cookie("popup1", popup1.pic, cookieConfig);

    const popup2 = await models.popup.findOne({
        raw: true,
        where: {
            position: 'L'
        }
    });
    const startDate2 = new Date(popup2.enddate) - new Date(popup2.startdate);
    const endDate2 = Math.abs(startDate2 / (24 * 60 * 60 * 1000));

    const cookieConfig2 = {
        //cookieConfig는 키, 밸류 외에 설정을 보낼 수 있다.
        maxAge: endDate2 * 24 * 60 * 60,
        //밀리초 단위로 들어가는데 30000을 설정하면 30초만료 쿠키를 생성한다.
        path: '/',
        // httpOnly: true,
        //통신할때만 접속할 수 있다. 기본값은 false임
        signed: true,
        //쿠키를 암호화 시킨다.
    };

    res.cookie("popup2", popup2.pic, cookieConfig2);

    const banner1 = await models.banner.findOne({
        raw: true,
        where: {
            position: 'L'
        }
    });

    const banner2 = await models.banner.findOne({
        raw: true,
        where: {
            position: 'R'
        }
    });
console.log(banner1);
    const Auth = {};
    const login = {};
    const Manager = {};
    const searchkeyword = {};

    res.render('tourlandMain', {
        currentProductPrice,
        currentProductPrice2,
        currentProduct,
        currentProduct2,
        popup1,
        popup2,
        banner1,
        banner2,
        Auth,
        login,
        Manager,
        searchkeyword
    });
});

// router.get('/displayFile/:whichOne', async  (req, res, next) =>{
//     const choice = req.params.whichOne
//     if( )
//
//
//         })


/* GET home page. */
// router.get('/customer', async function (req, res, next) {
//     const cookieConfig = {
//         //cookieConfig는 키, 밸류 외에 설정을 보낼 수 있다.
//         maxAge: 30000,
//         //밀리초 단위로 들어가는데 30000을 설정하면 30초만료 쿠키를 생성한다.
//         path: '/',
//         httpOnly: true,
//         //통신할때만 접속할 수 있다. 기본값은 false임
//         signed: true,
//         //쿠키를 암호화 시킨다.
//     };
//
//     const popup1 =await models.popup.findAll({
//         raw: true,
//         where : {
//             position : "R"
//         }
//     });
//     console.log("2222->",popup1);
//
//     const popup2 =(await models.popup.findAll({
//         raw: true,
//         attributes: ["pic"],
//         where : {
//             position : "L"
//         }
//     })).map((e)=>{
//         return `${e.pic}`;
//         // console.log("4444=>", `${e.pic}`);
//     });
//
//     console.log("3333->",popup2);
//
//
//     res.cookie("popup1", popup2)
//     // try{
//     //   const airplane = await models.airplane.findAll({});
//     //   console.log("1111->", airplane);
//     //   res.send(airplane);
//     //
//     // } catch (err) {
//     //   console.error(err);
//     //   next(err);
//     // }
//     res.render('tourlandMain', {
//         title: 'Tour Land Shopping Site',
//         Auth: {},
//         login: "login",
//         Manager: {},
//         popup1: popup1,
//         popup2: popup2,
//         currentProduct: {},
//         currentProduct2: {},
//         banner1: {},
//
//         banner2: {},
//         currentProductPrice: {},
//         currentProductPrice2: {},
//     });
// });


module.exports = router;