let subm = document.querySelector("#subm");
let form = document.querySelector('.form')
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let table = document.querySelector('.table')
let read = document.querySelector('#read')
let addB = document.querySelector('#showF')
let closebtn = document.querySelector('.close')
let tabs = document.querySelector('.table')
let notReadButton = document.querySelector('#notRead')
let readButton = document.querySelector('#yesRead')
let readPagesDiv = document.querySelector('#readPages')
let nameError = document.querySelector('#nameError')

function Books(name, author, pages, read, progress) {
    this.name = name
    this.author = author
    this.pages = parseInt(pages)
    this.read = read
    this.progress = progress
    this.info = function () {
        return(this.name + " by " + this.author + ", " + this.pages + " pages" + ", " + this.read + "")
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

Books.prototype.updateTable = function () {

    t = this.name;
    a = this.author;
    p = this.pages;
    r = this.read;
    pr = this.progress;

    console.log(`${p}:${r}:${pr}`)

    let newBook = document.createElement('div');
    this.addToNode(newBook, ['bookTab']);
  
/* head division */
    let headBar = document.createElement('div');

    let edit = document.createElement('button');
    this.addToNode(edit, ['edit'], "Edit", headBar);

    let btn = document.createElement('button');
    this.addToNode(btn, ['remove'],'Remove', headBar);

    this.addToNode(headBar, ['bookBar'], undefined, newBook);


/* info body*/    
    let bookInfo = document.createElement('div');
    

    let bookName = document.createElement('div');
    this.addToNode(bookName, ['title'], t, bookInfo);

    let bookAuthor = document.createElement('div');
    this.addToNode(bookAuthor, ['author'], a, bookInfo);

    let bookPages = document.createElement('div');
    this.addToNode(bookPages, ['pages'], p, bookInfo);

    this.addToNode(bookInfo, ['bookInfo'], undefined, newBook);


/* progression info*/
    let progHeader = document.createElement('div');
    this.addToNode(progHeader, ['progHeader']);


    let bookRead = document.createElement('div');
    if (r == "read"){
        this.addToNode(bookRead, ['finished'], `Progress: ${this.pages}/${this.pages}`);
    } else {
        if(pr == undefined) {
            this.addToNode(bookRead, ["unknownProg"], `Progress: Unknown`);
        }else {
            this.addToNode(bookRead, undefined, `Progress: ${pr}/${p}`);
            (pr == p)?this.addToNode(bookRead, ['finished']):this.addToNode(bookRead, ['incomplete']);
        };
    };
    progHeader.appendChild(bookRead); 

    


 /* progress bar*/   
    let prog = document.createElement('div');
    this.addToNode(prog, ['progressBar']);
    let completed = document.createElement('div');
    if(r == "not read" && pr == undefined) this.addToNode(completed, ['unknown']);
    else this.addToNode(completed, ['completed']);
    this.addToNode(completed, ['completed']);
    completed.style.width = `${pr * 100 / p}%`

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


Books.prototype.remAddButtons = function(Enode, op, bookRead, completed) {

    Enode.addEventListener('mousedown', () => {  /*............................we first add the javascript properties of the node before passing it to the function */
        console.log(this.progress);
        if (op == "++") this.progress++;
        else this.progress--;

        console.log(this.progress);
    /* pages and progress equal*/
        if(this.progress == this.pages) {
            bookRead.classList.remove('incomplete');
            this.addToNode(bookRead, ['finished']);
            this.addToNode(bookRead, ['modifying'], `Progress: ${this.progress}/${this.pages}`);
    /* progress less than pages and more than 0 */
        } else if (this.progress < this.pages && this.progress > 0){
           
            bookRead.classList.remove('unread')
            this.addToNode(bookRead, ['incomplete']);
            this.addToNode(bookRead, ['modifying'], `Progress: ${this.progress}/${this.pages}`);
    /* progress greater than pages*/
        } else if (this.progress > this.pages) {
            this.progress--;
            this.addToNode(bookRead, ['modifying']);
    /* progress lower than 0*/
        } else if (this.progress < 0) {
            this.progress++;
            this.addToNode(bookRead, ['modifying']);
    /* progress = undefined */
        } else {
            if (op == "++") {                
                bookRead.classList.remove('unknownProg');
                this.addToNode(bookRead, ['incomplete']);
                this.addToNode(bookRead, ['modifying'], `Progress: ${this.progress = 1}/${this.pages}`);
                completed.classList.remove('unknown');

            }else {
                bookRead.classList.remove('unknownProg');
                this.addToNode(bookRead, ['unread']);
                this.addToNode(bookRead, ['modifying'], `Progress: ${this.progress = 0}/${this.pages}`);
                completed.classList.remove('unknown')

            }
        }
        
        completed.style.width = `${this.progress * 100 / this.pages}%`
    })
    Enode.addEventListener('mouseup', () => {  /*............................we first add the javascript properties of the node before passing it to the function */

            bookRead.classList.remove('modifying');
    })   
}

let myLibrary = [];

myLibrary.push(new Books("The Hobbit", "J.R.R Tolkien", 295, "read", 295));
myLibrary.push(new Books("The Goodfather The Goodfather The Goodfather", "J.R.R Tolkien", 800, "not read", 755));
myLibrary.push(new Books("Lorem Ipsum is simply dummy text of the printing and typesetting industry", "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 20, "not read", undefined));

document.addEventListener('DOMContentLoaded', () => {
    myLibrary.forEach(book => {
        book.updateTable();
    })
})

addB.addEventListener('click', () => {
    clearFields();
    addBookStatus (true);
    title.focus();
});



closebtn.addEventListener('click', () => {
    addBookStatus (false)
})

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

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(myLibrary)

    let t = title.value;
    let a = author.value;
    let p = parseInt(pages.value);
    let r;
    let pr;
    let E1 = false;
    let E2 = false;
    
    read.childNodes.forEach(node => {
        if(node.checked == true) r = node.value;
    });  

    if(r == "read") {
        pr = p;
    }else {
        console.log(readPagesDiv.querySelector('input').value)
        if (readPagesDiv.querySelector('input').value == "") pr = undefined;
        else pr = parseInt(readPagesDiv.querySelector('input').value);
    }

    if(pr > p) E2 = true;

    if(!checkIfBookExist(title.value)) E1 = true;
    if(checkForErrors(E1, E2)) return;

    addBookStatus (false)
    newElement(t, a, p, r, pr)
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

function addBookStatus (status) {
    if (status == true) {
        document.querySelector('.window').classList.add('active')
        document.querySelector('.popup').classList.add('active')

        
    }else {
        document.querySelector('.window').classList.remove('active')
        document.querySelector('.popup').classList.remove('active')

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

function checkForErrors(E1, E2) {
    if(E1 == true || E2 == true) {
        if(E1 == true) {
            nameError.textContent = "This book already exists in your list.";
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
}

function newElement(t, a, p, r, pr) {

    addBookToArray(t, a, p, r, pr);
    myLibrary[myLibrary.length - 1].updateTable();
    console.log(myLibrary)

}

function addBookToArray(t, a, p, r, pr) {
    let newBook = new Books(t, a, p, r, pr);
    myLibrary.push(newBook);
}



















let butt = document.querySelector('#butt');
butt.addEventListener('click', () => {
    console.log(myLibrary)
})

