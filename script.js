let subm = document.querySelector("#subm");
let ABform = document.querySelector('#ABform')
let title = document.querySelector("#title");
let Etitle = document.querySelector("#Etitle");
let author = document.querySelector("#author");
let Eauthor = document.querySelector("#Eauthor");
let pages = document.querySelector("#pages");
let Epages = document.querySelector("#Epages");
let EpagesR = document.querySelector("#EpagesR");
let table = document.querySelector('.table');
let read = document.querySelector('#read');
let addB = document.querySelector('#showF');
let addB2 = document.querySelector('#showF2');
let ABclosebtn = document.querySelector('#ABclose');
let Eclose = document.querySelector('#Eclose');
let Rclose = document.querySelector('#Rclose');
let edit = document.querySelector('#Eform');
let tabs = document.querySelector('.table');
let notReadButton = document.querySelector('#notRead');
let readButton = document.querySelector('#yesRead');
let readPagesDiv = document.querySelector('#readPages');
let nameError = document.querySelector('#nameError');
let EnameError = document.querySelector('#EnameError');
let EpageError = document.querySelector('#EpageError');
let remYes = document.querySelector('#remYes');
let remNo = document.querySelector('#remNo');

class Books {
    constructor(name, author, pages, read, progress){
        this.name = name
        this.author = author
        this.pages = parseInt(pages)
        this.read = read
        this.progress = progress
        this.index = index
        this.info = function () {
            return(this.name + " by " + this.author + ", " + this.pages + " pages" + ", " + this.read + "")
        }
        index++;
        /* create and update nodes*/
    
        this.createTab = function () {
    
    
            let t = this.name;
            let a = this.author;
            let p = this.pages;
            let r = this.read;
            let pr = this.progress;
    
            console.log(`${p}:${r}:${pr}`)
    
            let newBook = document.createElement('div');
            this.TAB = newBook;
            this.addToNode(newBook, ['bookTab']);
        
        /* head division */
            let headBar = document.createElement('div');
    
            let edit = document.createElement('button');
            edit.addEventListener('click', () => {
                /* fill empty fields in edit form the the book-s info*/
                Etitle.value = this.name;
                Eauthor.value = this.author;
                Epages.value = this.pages;
                if(this.progress == null) EpagesR.value = 0;
                else EpagesR.value = this.progress;
                objTemp = this;
    
                console.log(table.childNodes[table.childNodes.length - 1])
            
                popUpStatus (true, '#editBook', '#edit', 'active');
            })
            this.addToNode(edit, ['edit'], "Edit", headBar);
    
    
            let btn = document.createElement('button');
            btn.addEventListener('click', () => {
                objTemp = this;
                popUpStatus (true, '#removeBook', '#remove', 'activeR')
                updtInfo();
            });
            this.addToNode(btn, ['remove'],'Remove', headBar);
    
            this.addToNode(headBar, ['bookBar'], undefined, newBook);
    
    
        /* info body*/    
            let bookInfo = document.createElement('div');
            
    
            let bookName = document.createElement('div');
            this.Ttitle = bookName;
            this.addToNode(bookName, ['title'], undefined, bookInfo);
    
            let bookAuthor = document.createElement('div');
            this.Tauthor = bookAuthor;
            this.addToNode(bookAuthor, ['author'], undefined, bookInfo);
    
            let bookPages = document.createElement('div');
            this.Tpages = bookPages;
            this.addToNode(bookPages, ['pages'], undefined, bookInfo);
    
            this.addToNode(bookInfo, ['bookInfo'], undefined, newBook);
    
    
        /* progression info*/
            let progHeader = document.createElement('div');
            this.addToNode(progHeader, ['progHeader']);
    
    
            let bookRead = document.createElement('div');
            this.TbookRead = bookRead;
    
            
            progHeader.appendChild(bookRead); 
    
            
        /* progress bar*/   
            let prog = document.createElement('div');
            this.addToNode(prog, ['progressBar']);
            let completed = document.createElement('div');
            this.Tcompleted = completed;
            if(r == "not read" && pr == undefined) this.addToNode(completed, ['unknown']);
            else this.addToNode(completed, ['completed']);
            this.addToNode(completed, ['completed']);
            
    
        /* progress buttons */
    
            let addRemovePages = document.createElement('div');
            let removep = document.createElement('button')
            this.remAddButtons(removep, "--", bookRead, completed) 
            this.addToNode(removep, ['remop'], "-", addRemovePages);
            let addp = document.createElement('button');
            this.remAddButtons(addp, "++", bookRead, completed)  
            this.addToNode(addp, ['addp'], "+", addRemovePages);
    
        /* add buttons to progHeader and then progHeader to the book */
            progHeader.appendChild(addRemovePages);
            newBook.appendChild(progHeader)
        /* append complete bar to progression bar and then progression bar to the book tab*/
            prog.appendChild(completed);
            newBook.appendChild(prog);
    
        /* append to div*/
            tabs.appendChild(newBook);
        };
    
        /* update... u=0 update new node, u=1 update existing node*/
        this.updt = function (u) {
            this.Ttitle.textContent = this.name;
            this.Tauthor.textContent = this.author;
            this.Tpages.textContent = this.pages;
         
    
            if(u == 0) {
                if (this.read == "read"){
                    this.addToNode(this.TbookRead, ['finished'], `Progress: ${this.pages}/${this.pages}`);
                } else {
                    if(this.progress == undefined) {
                        this.addToNode(this.TbookRead, ["unknownProg"], `Progress: Unknown`);
                    }else {
                        this.TbookRead.textContent = `Progress: ${this.progress}/${this.pages}`;
                        (this.progress == this.pages)?this.addToNode(this.TbookRead, ['finished']):this.addToNode(this.TbookRead, ['incomplete']);
                    };
                };
                this.Tcompleted.style.width = `${this.progress * 100 / this.pages}%`
            } else {
    
                if (this.pages == this.progress){
                    
                    this.addToNode(this.TbookRead, ['finished'], `Progress: ${this.pages}/${this.pages}`);
                    this.TbookRead.classList.remove('unread');
                    this.TbookRead.classList.remove('incomplete')
                    this.TbookRead.classList.remove('unknownProg')
                    this.TbookRead.classList.add('finished')
    
                    this.Tcompleted.classList.remove('unknown');
                    this.addToNode(this.Tcompleted, ['completed']);
                    this.Tcompleted.style.width = `${this.progress * 100 / this.pages}%`
                } else {
                    
                    if(this.progress == 0) {
    
                        this.addToNode(this.TbookRead, ["unknownProg"], `Progress: Unknown`);
    
                        this.TbookRead.classList.remove('modifying')
                        this.TbookRead.classList.remove('finished')
                        this.TbookRead.classList.add('unknownProg')
    
                        this.Tcompleted.classList.remove('complete');
                        this.addToNode(this.Tcompleted, ['unknown']);
                        this.Tcompleted.style.width = `100%`;
                    }else {
    
                        
                        this.TbookRead.textContent = `Progress: ${this.progress}/${this.pages}`;
    
                        this.TbookRead.classList.remove('unread')
                        this.TbookRead.classList.remove('finished')
                        this.TbookRead.classList.remove('unknownProg')
                        this.TbookRead.classList.add('incomplete')
    
                        this.Tcompleted.classList.remove('unknown');
                        this.addToNode(this.Tcompleted, ['completed']);
                        (this.progress == this.pages)?this.addToNode(this.TbookRead, ['finished']):this.addToNode(this.TbookRead, ['incomplete']);
                        this.addToNode(this.Tcompleted, ['completed']);
                        this.Tcompleted.style.width = `${this.progress * 100 / this.pages}%`
                    };
                };
            }
            
        }
    }
    
    
}

Books.prototype.addToNode = function(node, array, text, appendTo) {
    if(!(node == undefined) && !(array==undefined)) this.setClass(node, array);
    if(text != undefined) this.setText(node, text);
    if(appendTo != undefined) this.appendNode(node, appendTo);
};

Books.prototype.setClass = function(node, array) {
    array.forEach(classes => {
        node.classList.add(`${classes}`)
    });
}

Books.prototype.setText = function (node, text) {
    node.textContent = text;
};

Books.prototype.appendNode = function(node, node2) {
    node2.appendChild(node)
}




Books.prototype.remAddButtons = function(Enode, op, bookRead, completed) {
    
    Enode.addEventListener('mousedown', () => {  /*............................we first add the javascript properties of the node before passing it to the function */
        if (op == "++") {
            this.progress++; 
            
        }else this.progress--;
        

    /* pages and progress equal*/
        if(this.progress == this.pages) {
            console.log('1');
            this.read = "read";
            bookRead.classList.remove('incomplete');
            this.addToNode(bookRead, ['finished']);
            this.addToNode(bookRead, ['modifying'], `Progress: ${this.progress}/${this.pages}`);
            
            booksRead++;
            pagesRead++;  
            
            
            
    /* progress less than pages and more than 0 */
        } else if (this.progress < this.pages && this.progress > 0){
            this.read = "not read"
            console.log('2');
            bookRead.classList.remove('unread')
            bookRead.classList.remove('unknownProg')
            this.addToNode(bookRead, ['incomplete']);
            this.addToNode(bookRead, ['modifying'], `Progress: ${this.progress}/${this.pages}`);
            completed.classList.remove('unknown');
            completed.classList.add('completed');
            if(pagesRead <= totalPages) {
                if(op == "++")pagesRead++;
                else {
                    pagesRead--;
                    if (this.progress == this.pages - 1) booksRead--;
                }  
            }
    /* progress greater than pages*/
        } else if (this.progress > this.pages) {
            console.log('3');
            this.progress--;
            this.addToNode(bookRead, ['modifying']);
            
    /* progress lower than 0*/
        } else if (this.progress < 0) {

            bookRead.classList.remove('modifying')
            bookRead.classList.remove('unknownProg')
            this.addToNode(bookRead, ['modifying'], `Progress: 0/${this.pages}`);
            this.progress++;
            this.addToNode(bookRead, ['unread']);
    /* progress = undefined */
        } else {

            if (op == "++") {        
                console.log('5');        
                bookRead.classList.remove('unknownProg');
                this.addToNode(bookRead, ['incomplete']);
                this.addToNode(bookRead, ['modifying'], `Progress: ${this.progress = 1}/${this.pages}`);
                completed.classList.remove('unknown');

            }else {
                console.log('6');
                bookRead.classList.remove('unknownProg');

                this.addToNode(bookRead, ['unread']);
                this.addToNode(bookRead, ['modifying'], `Progress: ${this.progress = 0}/${this.pages}`);
                completed.classList.remove('unknown')
                pagesRead--;

            }
        }
        
        completed.style.width = `${this.progress * 100 / this.pages}%`
        updtInfo();
    })
    Enode.addEventListener('mouseup', () => {  /*............................we first add the javascript properties of the node before passing it to the function */
            bookRead.classList.remove('modifying');
    });
    
}

let myLibrary = [];
let objTemp;
let tabTemp;
let index = 0;

myLibrary.push(new Books("The Hobbit", "J.R.R Tolkien", 295, "read", 295));
myLibrary.push(new Books("The Hobbit 2", "J.R.R Tolkien", 245, "not read", 201));
myLibrary.push(new Books("The Goodfather", "J.R.R Tolkien", 800, "not read", 755));
myLibrary.push(new Books("Lorem Ipsum is simply dummy text of the printing and typesetting industry", "Lorem Ipsum has been the industry's standard", 20, "not read", undefined));

document.addEventListener('DOMContentLoaded', () => {
    myLibrary.forEach(book => {
        book.createTab();
        book.updt(0);
    })

    refreshInfo()
    updtInfo()
})

window.addEventListener('resize', () => {
    if (this.innerWidth < 600) {
        console.log(this.innerHeight)
        document.querySelector('.tb').style.flexDirection = "column";
        document.querySelector('.tb').style.alignItems = "stretch";
        
        document.querySelector('.infoPan').classList.add("infoPanA");
    }else {
        document.querySelector('.tb').style.flexDirection = "row";
        document.querySelector('.infoPan').classList.remove("infoPanA");

    }


})

addB.addEventListener('click', () => {
    clearFields();
    popUpStatus (true, '#addBook', '#newBook', 'active');
    title.focus();
});

addB2.addEventListener('click', () => {
    clearFields();
    popUpStatus (true, '#addBook', '#newBook', 'active');
    title.focus();
});

ABclosebtn.addEventListener('click', () => popUpStatus (false, '#newBook', '#addBook', 'active'));

Eclose.addEventListener('click', () => popUpStatus (false, '#editBook', '#edit', 'active'));

Rclose.addEventListener('click', () => popUpStatus (false, '#removeBook', '#remove', 'activeR'))




title.addEventListener('keydown', () => {
    nameError.textContent = "";
})

notReadButton.addEventListener('click', () => {
    if (readPagesDiv.innerHTML == "") {
        togglePagesDiv();
    };
})

readButton.addEventListener('click', () => {
    readPagesDiv.innerHTML = "";
})

ABform.addEventListener('submit', (e) => {

    e.preventDefault();
    console.log(myLibrary)

    let t = title.value;
    let a = author.value;
    let p = parseInt(pages.value);
    let r;
    let pr;
    let E1 = false;
    let E2 = false;
    let E3 = false;
    
    read.childNodes.forEach(node => {
        if(node.checked == true) r = node.value;
    });  

    if(r == "read") {
        pr = p;
        booksRead++;
    }else {
        console.log(readPagesDiv.querySelector('input').value)
        if (readPagesDiv.querySelector('input').value == "") pr = undefined;
        else pr = parseInt(readPagesDiv.querySelector('input').value);
        if(r == "read") booksRead++;
    }

    if(pr > p) E2 = true;

    if(!checkIfBookExist(title.value)) E1 = true;
    if (checkTitleLength(title.value)) E3 = true;
    
    checkForErrors();
    
    if(checkForErrors(E1, E2, E3, 1)) return;

    popUpStatus (false, '#addBook', '#newBook', 'active')
    newElement(t, a, p, r, pr)

 
})


Eform.addEventListener('submit', (e) => {
    e.preventDefault();

    let E1 = false;
    let E2 = false;
    let E3 = false;
    if(parseInt(EpagesR.value) > parseInt(Epages.value)) E2 = true;
    if(Etitle.value != objTemp.name) if(!checkIfBookExist(Etitle.value)) E1 = true;
    if (checkTitleLength(Etitle.value)) E3 = true;

    console.log(`${E1} : ${E2} : ${E3}`)
    
    if(checkForErrors(E1, E2, E3, 2)) return;

    

    objTemp.name = Etitle.value;
    objTemp.author = Eauthor.value;
    objTemp.pages = parseInt(Epages.value);
    objTemp.progress = parseInt(EpagesR.value);

    objTemp.updt(1);

    popUpStatus (false, '#editBook', '#edit', 'active');

    refreshInfo();
    updtInfo();
    console.log(myLibrary)
});


Etitle.addEventListener('keydown', () => {
    EnameError.textContent = "";
})

Epages.addEventListener('keydown', () => {
    EpageError.textContent = "";
})
EpagesR.addEventListener('keydown', () => {
    EpageError.textContent = "";
})

remYes.addEventListener('click', () => {

    /* remove child from table*/
    console.log(objTemp.index + ":" + `${objTemp.index + 1}`)
    myLibrary.splice(objTemp.index, 1);
    console.log(myLibrary);
    myLibrary.forEach(book => {
        if(book.index > objTemp.index) book.index--;
    });
    tabs.removeChild(objTemp.TAB);
    
    console.log(tabs.childNodes)
    popUpStatus (false, '#removeBook', '#remove', 'activeR')
    refreshInfo();
    updtInfo();
    console.log(myLibrary)
})

remNo.addEventListener('click', () => {

    popUpStatus (false, '#removeBook', '#remove', 'activeR')
})

document.querySelector('#searchBox').addEventListener('submit', (e) => {
    e.preventDefault();

    let results = [];

    myLibrary.forEach(book => {


        if (book.name.toLowerCase().includes(document.querySelector('#srchInpt').value.toLowerCase())) {
            table.innerHTML = "";
            results.push(book);
        }
    })

    if(results.length > 0){
        results.forEach(result => table.appendChild(result.TAB))
    }else if (document.querySelector('#srchInpt').value == "") {
            myLibrary.forEach(book => {
                table.appendChild(book.TAB)
            })
    }else alert('no results found');


})

document.querySelector('#rst').addEventListener('click', () => {
    table.innerHTML = "";
    document.querySelector('#srchInpt').value = "";
    myLibrary.forEach(book => {

        table.appendChild(book.TAB);
    })
})

function clearFields() {
    title.value = "";
    author.value = "";
    pages.value = "";
    readButton.checked = false;
    notReadButton.checked = false;
    readPagesDiv.innerHTML = "";
    nameError.textContent = "";

};
/*aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa*/
function popUpStatus (status, selector1, selector2, clss) {
    if (status == true) {
        document.querySelector(selector1).classList.add('active')
        document.querySelector(selector2).classList.add(clss)

        
    }else {
        document.querySelector(selector1).classList.remove('active')
        document.querySelector(selector2).classList.remove(clss)

    }
     
}

function togglePagesDiv() {
    let label = document.createElement('label')
    label.textContent = "Pages read: ";
    let pagesRead = document.createElement('input')
    pagesRead.type = 'number';
    pagesRead.min = 1;
    pagesRead.addEventListener('keydown', () => {
        if(readPagesDiv.querySelector('div')) {
            let errormess = readPagesDiv.querySelector('div')
            readPagesDiv.removeChild(errormess);
        }
    })

    readPagesDiv.appendChild(label);
    readPagesDiv.appendChild(pagesRead);
}

function checkIfBookExist(titl) {
    let bRead = true
    myLibrary.forEach(book => {
        if(book.name == titl) bRead = false;
    })
    return bRead;
}

function checkTitleLength(title) {
    if(title.length > 50) return true;
}

function checkForErrors(E1, E2, E3, p) {
    if(p == 1) {
        if(E1 == true || E2 == true || E3 == true) {
            if(E1 == true) {
                nameError.textContent = "This book already exists in your list.";
                nameError.style.color = 'red';
            } else if(E3 == true) {
                nameError.textContent = "Title must have less than 50 characters";
                nameError.style.color = 'red';
            };
            
            if(E2 == true) {
                if (readPagesDiv.childNodes.length < 3) {
                    let errorDiv = document.createElement('div');
                    errorDiv.textContent = "Number of read pages cant be greater than number of pages";
                    errorDiv.style.color = 'red';
                    readPagesDiv.appendChild(errorDiv);
                    
                }
            };
            return true;
        };
    }else {
        if(E1 == true || E2 == true || E3 == true) {
            if(E1 == true) {
                EnameError.textContent = "This book already exists in your list.";
                EnameError.style.color = 'red';
            } else if(E3 == true) {
                EnameError.textContent = "Title must have less than 50 characters";
                EnameError.style.color = 'red';
            };
            
            if(E2 == true) {
                if (readPagesDiv.childNodes.length < 3) {
                    EpageError.textContent = "Number of read pages cant be greater than number of pages";
                    EpageError.style.color = 'red';
                }
            };
            return true;
        };
    }

}

function newElement(t, a, p, r, pr) {

    if(pr == p) {
        r == "read";
        booksRead++;
    }

    addBookToArray(t, a, p, r, pr);
    myLibrary[myLibrary.length - 1].createTab();
    myLibrary[myLibrary.length - 1].updt(0);
    console.log(myLibrary)

    totalBooks++;
    totalPages += myLibrary[myLibrary.length - 1].pages;
    if(myLibrary[myLibrary.length - 1].progress != undefined) pagesRead += myLibrary[myLibrary.length - 1].progress;
    updtInfo()

}

function addBookToArray(t, a, p, r, pr) {
    let newBook = new Books(t, a, p, r, pr);
    myLibrary.push(newBook);
}

let totalBooks = 0;
let booksRead = 0;
let pagesRead = 0;
let totalPages = 0;


function refreshInfo() {
    totalBooks = 0;
    booksRead = 0;
    pagesRead = 0;
    totalPages = 0;
    myLibrary.forEach(book => {
        totalBooks++;
        if(book.progress == undefined) book.progress = 0;
        pagesRead += book.progress;
        if(book.read == "read") booksRead++;
        totalPages += book.pages;
    })
}

function updtInfo() {
    document.querySelector('#TBook').textContent = totalBooks;
    document.querySelector('#TBookR').textContent = booksRead;
    document.querySelector('#IPageR').textContent = pagesRead;
    document.querySelector('#IPageT').textContent = totalPages;    
}

















