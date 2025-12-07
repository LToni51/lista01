let listaDeCompras = []
let listaDePrecos = []
let listaDeIds = []

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

function adicionar() {
    const produtoInput = document.getElementById('produto')
    const precoInput = document.getElementById('preco')
    const quantInput = document.getElementById('quant')
    
    // Validações
    if (!produtoInput.value.trim()) {
        alert('Por favor, insira um nome de produto')
        produtoInput.focus()
        return
    }
    
    if (!precoInput.value || parseFloat(precoInput.value) <= 0) {
        alert('Por favor, insira um preço válido')
        precoInput.focus()
        return
    }
    
    if (!quantInput.value || parseInt(quantInput.value) <= 0) {
        alert('Por favor, insira uma quantidade válida')
        quantInput.focus()
        return
    }
    
    const txtProd = produtoInput.value.trim()
    const npreco = parseFloat(precoInput.value)
    const nquant = parseInt(quantInput.value)
    const total = npreco * nquant
    const id = Date.now()
    
    listaDeCompras.push(txtProd)
    listaDePrecos.push(total)
    listaDeIds.push(id)
    
    adicionarProdutoDOM(txtProd, npreco, nquant, total, id)
    atualizarTotal()
    
    // Limpar inputs
    produtoInput.value = ''
    precoInput.value = ''
    quantInput.value = '1'
    produtoInput.focus()
}

function adicionarProdutoDOM(produto, preco, quant, total, id) {
    const listaProd = document.getElementById('listaProd')
    
    // Remover mensagem vazia se existir
    const emptyMsg = listaProd.querySelector('.empty-message')
    if (emptyMsg) {
        emptyMsg.remove()
    }
    
    const productItem = document.createElement('div')
    productItem.className = 'product-item'
    productItem.id = `product-${id}`
    
    productItem.innerHTML = `
        <div class="product-info">
            <span class="product-name">${produto}</span>
            <div class="product-details">
                <span>Qtd: ${quant}</span>
                <span>Un: ${formatarMoeda(preco)}</span>
            </div>
        </div>
        <span class="product-total">${formatarMoeda(total)}</span>
        <button class="btn-remove" onclick="removerProduto(${id})" title="Remover produto">
            <i class="fas fa-trash"></i>
        </button>
    `
    
    listaProd.appendChild(productItem)
}

function removerProduto(id) {
    const indice = listaDeIds.indexOf(id)
    
    if (indice > -1) {
        listaDeCompras.splice(indice, 1)
        listaDePrecos.splice(indice, 1)
        listaDeIds.splice(indice, 1)
        
        const element = document.getElementById(`product-${id}`)
        element.style.animation = 'slideOut 0.3s ease'
        setTimeout(() => {
            element.remove()
            
            // Mostrar mensagem vazia se lista estiver vazia
            const listaProd = document.getElementById('listaProd')
            if (listaProd.children.length === 0) {
                const emptyMsg = document.createElement('p')
                emptyMsg.className = 'empty-message'
                emptyMsg.textContent = 'Nenhum produto adicionado ainda'
                listaProd.appendChild(emptyMsg)
            }
            
            atualizarTotal()
        }, 300)
    }
}

function atualizarTotal() {
    let totalfinal = 0
    for (let i = 0; i < listaDePrecos.length; i++) {
        totalfinal += listaDePrecos[i]
    }
    
    const listaFinal = document.getElementById('final')
    listaFinal.textContent = formatarMoeda(totalfinal)
}

function limparLista() {
    if (listaDeCompras.length === 0) {
        alert('A lista já está vazia!')
        return
    }
    
    if (confirm('Tem certeza que deseja limpar toda a lista? Esta ação não pode ser desfeita.')) {
        listaDeCompras = []
        listaDePrecos = []
        listaDeIds = []
        
        const listaProd = document.getElementById('listaProd')
        listaProd.innerHTML = '<p class="empty-message">Nenhum produto adicionado ainda</p>'
        atualizarTotal()
    }
}

