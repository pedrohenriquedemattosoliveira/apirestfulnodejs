const express = require('express')
const app = express()
const mongoose = require("mongoose")
const Person = require("./models/Person")

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.post('/person', async (req, res) => {
    const { name, salary, approved } = req.body
    const person = {
        name,
        salary,
        approved,
    }
    try {
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.get('/', (req, res) => {
    res.json({message: 'Oi Express'})
})

app.put('/person/:id', async (req, res) => {
    const id = req.params.id
    const { name, salary, approved } = req.body
    
    const person = {
        name,
        salary,
        approved,
    }
    
    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)
        
        if (updatedPerson.matchedCount === 0) {
            res.status(404).json({ message: 'Pessoa não encontrada' })
            return
        }
        
        res.status(200).json({ message: 'Pessoa atualizada com sucesso' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

mongoose.connect('mongodb://localhost:27017/teste')
    .then(() => {
        console.log('Conectado ao MongoDB')
        app.listen(3000)
    })
    .catch((err) => console.log(err))