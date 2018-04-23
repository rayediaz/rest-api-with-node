const r = require('rethinkdb')

class Db {
  connect () {
    this.connection = r.connect({
      host: 'localhost',
      port: 28015,
      db: 'audiomus'
    })
  }

  saveSong (song) {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection
      let created = await r.db('audiomus').table('songs').insert(song).run(conn)
      return created
    }
    return Promise.resolve(tasks())
  }

  getSongs () {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection
      let songs = await r.db('audiomus').table('songs').run(conn)
      let result = await songs.toArray()
      return result
    }
    return Promise.resolve(tasks())
  }

  getSong (id) {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection
      let song = await r.db('audiomus').table('songs').get(id).run(conn)
      return song
    }
    return Promise.resolve(tasks())
  }

  updateSong (id, newSong) {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection
      let song = await r.db('audiomus').table('songs').get(id).update(newSong).run(conn)

      return song
    }
    return Promise.resolve(tasks())
  }

  deleteSong (id) {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection
      let song = await r.db('audiomus').table('songs').get(id).delete().run(conn)

      return song
    }
    return Promise.resolve(tasks())
  }
}

module.exports = Db
