import ejs from "ejs";
import express from "express";
import path from 'path';
import puppeteer from "puppeteer";
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    res.render('index',{title:'bhumit'});
})

app.get('/show',(req,res) => {
    res.render('certificate',{name:'bhumit'});
})

app.get('/pdf', async (req,res)=>{
    let browser;
    try{
        browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        const html = await ejs.renderFile(path.join(__dirname,'/views/certificate.ejs'),{name:'bhumit'});
        await page.setContent(html);
        const pdf = await page.pdf({format: 'A4'});
        res.contentType('application/pdf');
        res.send(pdf);
    } catch(error: any) {
        return res.json({error: error?.message});
    } finally {
        browser?.close();
    }
})

app.listen(3000,()=>{
    console.log('working at http://localhost:3000');
})