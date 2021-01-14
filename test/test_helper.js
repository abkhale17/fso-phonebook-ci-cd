const Persons = require('../src/server/models/person')

const initialPersons = [
  {
    name: "whatta jaffaaa",
    number: "32-66-8779-0879"
  },
  {
    name: "Tyler Durden",
    number: "329049230942334"
  },
  {
    name: "test cricket",
    number: "+91 5787657890"
  },
]

const personsInDb = async () => {
  const persons = await Persons.find({})
  return persons.map(contact => contact.toJSON())
}

module.exports = {
  initialPersons, personsInDb
}