const statusMessage = document.querySelector('p.status');

const productInput = document.getElementById('product');

const addBtn = document.getElementById('add');
addBtn.addEventListener('click', addNewProduct);

const productsBox = document.querySelector('.products');

const clearListBtn = document.getElementById('clear');
clearListBtn.addEventListener('click', deleteProducs);

let currentProduct = {}; //for easy access from anywhere, especialy for change event


function addNewProduct() {//add product hendler
    const product = productInput.value;

    if(product.length === 0){//check if input empty -> set status message with error
        setStatusOfMessage('error', 'Please enter value');
    }else{ //add new product to list
        const li = document.createElement('li');
        li.innerHTML = `<span id='name'>${product}</span>
                        <div class="controllers">
                            <button id='edit'><i class="fas fa-edit"></i></button>
                            <button id='delete'><i class="fas fa-trash"></i></button>
                        </div>`;
        
        addListeners(li); 
        
        productsBox.append(li);

        setStatusOfMessage('success', 'Item added to the list');

        resetInput();
    }

    showStatusMessage(); //show message

    clearListBtn.style.visibility = 'visible';
}

function editProduct(){//edit product handler
    currentProduct.querySelector('#name').innerText = productInput.value;

    addBtn.innerText = 'Submit';

    setStatusOfMessage('success', 'Value changed');
    showStatusMessage();

    resetInput();

    addBtn.removeEventListener('click', editProduct);
    addBtn.addEventListener('click', addNewProduct);
}

function deleteProducs(){//delete product handler
    productsBox.innerHTML = '';
    setStatusOfMessage('error', 'empty list');
    showStatusMessage();

    clearListBtn.style.visibility = 'hidden';
}

function addListeners(elem){ //adding remove and edit event listeners to controller buttons
    elem.querySelector('#delete').addEventListener('click', () => {//delete
        setStatusOfMessage('error', 'Item removed');
        showStatusMessage();

        elem.remove();
    });

    elem.querySelector('#edit').addEventListener('click', () => {//edit
        currentProduct = elem;
        addBtn.removeEventListener('click', addNewProduct);
        
        addBtn.innerText = 'Edit';

        let productTitle = elem.querySelector('#name').innerText;

        productInput.value = productTitle;
        productInput.focus();

        addBtn.addEventListener('click', editProduct);
    })
}

function showStatusMessage(){
    statusMessage.style.visibility = 'visible';
    setTimeout(() => {
        statusMessage.style.visibility = 'hidden';
        statusMessage.innerText = '';
    }, 2000);
}

function setStatusOfMessage(status, message){
    statusMessage.className = 'status';
    statusMessage.classList.add(status);
    statusMessage.innerText = message;
}

function resetInput(){
    productInput.value = '';
}