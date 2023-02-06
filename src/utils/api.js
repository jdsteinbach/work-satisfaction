import Airtable from 'airtable'
// import dotenv from 'dotenv';
// dotenv.config();

const { VITE_AIRTABLE_API_TOKEN, VITE_AIRTABLE_BASE, VITE_AIRTABLE_TABLE } = import.meta.env

const api = new Airtable({
  apiKey: VITE_AIRTABLE_API_TOKEN
}).base(VITE_AIRTABLE_BASE)

const get = (table, id) => {
  table = table || VITE_AIRTABLE_TABLE;

  return new Promise((resolve, reject) => {
    api(table).find(
      id,
      (err, record) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(record)
        }
      }
    )
  })
}

const getAll = (table) => {
  return new Promise((resolve, reject) => {
    table = table || VITE_AIRTABLE_TABLE;
    let allRecords = []

    api(table).select({
      maxRecords: 999
    }).eachPage((records, fetchNextPage) => {
      allRecords = [...allRecords, ...records]

      fetchNextPage()
    }, (err) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(allRecords)
      }
    })
  })
}

export {
  get,
  getAll
}
