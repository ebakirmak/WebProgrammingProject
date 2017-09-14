$(document).ready(function () {
    var sayac = 3;
    //SinifBilgileri adýnda bir object oluþturduk.
    var SinifBilgileri = function (adi, tip, method, nitelik, iliski) {
        this.adi = adi,
        this.tip = tip,
        this.method = method,
        this.nitelik = nitelik,
        this.iliski = iliski
    };
    //Oluþturduðumuz objeden  3 tane nesne oluþturuyoruz.
    var Sinif1 = new SinifBilgileri("Person", "Class", "getAdi():string", "Adi:string", "HP");
    var Sinif2 = new SinifBilgileri("Bank", "Abstract Class", "getEuro():decimal", "Euro:decimal", "Person");
    var Sinif3 = new SinifBilgileri("HP", "Class", "getPC():PC", "PC:string", "Bank");
    //Boþ bir diziye bu nesneleri ekliyoruz.
    var dizi = {};
    dizi[0] = Sinif1;
    dizi[1] = Sinif2;
    dizi[2] = Sinif3;
    //id si btnCiz olan butona týklandýðýnda ise aþaðýdaki iþlemler yapýlýyor.
    $("#btnCiz").click(function () {       
        $("#umlKutusu").html("");
        UMLCizmek(dizi);
    });

    $("#btnEkle").click(function () {    
        var eklenecek = new SinifBilgileri();
        eklenecek = SinifEkle();
        dizi[sayac++] = eklenecek
    });
});



//Sýnýf Ekleniyor.Tüm bilgiler alýnýyor...
function SinifEkle() {
    var SinifBilgileri = function (adi, tip, method, nitelik, iliski) {
        this.adi = adi,
        this.tip = tip,
        this.method = method,
        this.nitelik = nitelik,
        this.iliski = iliski

    };

    var eklenen = new SinifBilgileri($("#txtSinifAdi").val(), $("#txtSinifTip").val(), $("#txtSinifMethod").val(), $("#txtSinifNitelik").val(), $("#txtSinifIliski").val())
    return eklenen;

}

//Eklenen verilerin uml diagramý çizen method.
function UMLCizmek(dizi)
{
    //jointjs den bir grafik nesnesi oluþturuyoruz.
    var graphUML = new joint.dia.Graph();
    //Burada ayarlar yapýlýyor.
    var paper = new joint.dia.Paper({
        el: $('#umlKutusu'),
        width: 1200,
        height: 800,
        gridSize: 1,
        model: graphUML
    });
    var uml = joint.shapes.uml;
    var konumX = 0;
    var konumY = 0;
    var Class = {};
    $.each(dizi, function () {
        Class[this.adi] = SinifOlustur(uml, this, konumX, konumY);
        konumX += 250;
        if ((konumX + 240) > 1200) {
            konumX = 0;
            konumY += 110;
        }
    });
    _.each(Class, function (currentClass) { graphUML.addCell(currentClass); });
    var IliskiBilgileri = function (kaynak,hedef) {
        this.kaynak = kaynak,
        this.hedef = hedef
    };
    var Iliskiler=[];
    $.each(dizi, function () {
        Iliskiler.push( new IliskiBilgileri(this.adi, this.iliski));
    });
   
    var relations=[];
    $.each(Iliskiler, function () {
        if(this.hedef!="")
        relations.push(new uml.Generalization({
            source: { id: this.kaynak }, target: { id: this.hedef }
        }));      
    });
    _.each(relations, function (r) { graphUML.addCell(r); });
}

//Eklenen siniflarla ile ilgili bilgiler ve konumlar  Class dizisine atanmak için oluþturulan method
function SinifOlustur(uml, nesne, konumX, konumY) {
    var sinifAdi;
    sinifAdi = nesne.adi;
    sinifTip = nesne.tip;
    var currentClass
    if (sinifTip == "Class") {
        currentClass = new uml.Class({
            id: sinifAdi,
            position: { x: konumX, y: konumY },
            size: { width: 240, height: 100 },
            name: sinifAdi,
            attributes: [nesne.nitelik],
            methods: nesne.method,
            attrs: {
                '.uml-class-name-rect': {
                    fill: '#66FFFF  ',
                    stroke: '#ffffff',
                    'stroke-width': 0.5
                },
                '.uml-class-attrs-rect, .uml-class-methods-rect': {
                    fill: '#66FFFF',
                    stroke: '#fff',
                    'stroke-width': 0.5
                },
                '.uml-class-attrs-text': {
                    ref: '.uml-class-attrs-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle'
                },
                '.uml-class-methods-text': {
                    ref: '.uml-class-methods-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle'
                }

            }

        })

    }
    else if (sinifTip == "Abstract Class") {
        currentClass = new uml.Abstract({
            id: sinifAdi,
            position: { x: konumX, y: konumY },
            size: { width: 240, height: 100 },
            name: sinifAdi,
            attributes: [nesne.nitelik],
            methods: nesne.method,
            attrs: {
                '.uml-class-name-rect': {
                    fill: '#00FF99',
                    stroke: '#ffffff',
                    'stroke-width': 0.5
                },
                '.uml-class-attrs-rect, .uml-class-methods-rect': {
                    fill: '#00FF99',
                    stroke: '#fff',
                    'stroke-width': 0.5
                },
                '.uml-class-attrs-text': {
                    ref: '.uml-class-attrs-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle'
                },
                '.uml-class-methods-text': {
                    ref: '.uml-class-methods-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle'
                }

            }

        })

    }
    else {
        currentClass = new uml.Interface({
            id: sinifAdi,
            position: { x: konumX, y: konumY },
            size: { width: 240, height: 100 },
            name: sinifAdi,
            attributes: [nesne.nitelik],
            methods: nesne.method,
            attrs: {
                '.uml-class-name-rect': {
                    fill: '#CCCCFF',
                    stroke: '#ffffff',
                    'stroke-width': 0.5
                },
                '.uml-class-attrs-rect, .uml-class-methods-rect': {
                    fill: '#CCCCFF',
                    stroke: '#fff',
                    'stroke-width': 0.5
                },
                '.uml-class-attrs-text': {
                    ref: '.uml-class-attrs-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle'
                },
                '.uml-class-methods-text': {
                    ref: '.uml-class-methods-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle'
                }

            }

        })

    }



    return currentClass;
}