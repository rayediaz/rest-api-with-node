const r = require('rethinkdb')
const config = require('../config')
class Db {
  connect () {
    this.connection = r.connect({
      host: config.host,
      port: config.port,
      db: config.db
    })
  }

  saveSong (song) {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection

      let created = await r.db('test').table('songs').insert(song, { returnChanges: true }).run(conn)
      let saved = created.changes[0].new_val

      return saved
    }

    return Promise.resolve(tasks())
  }

  getSongs () {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection

      let songs = await r.db('test').table('songs').run(conn)
      let result = await songs.toArray()

      return result
    }

    return Promise.resolve(tasks())
  }

  getSong (id) {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection

      let song = await r.db('test').table('songs').get(id).run(conn)
      return song
    }

    return Promise.resolve(tasks())
  }

  updateSong (id, newSong) {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection
      let song = await r.db('test').table('songs').get(id).update(newSong, { returnChanges: true }).run(conn)
      let created = song.changes

      return created
    }

    return Promise.resolve(tasks())
  }

  deleteSong (id) {
    let connection = this.connection

    let tasks = async function () {
      let conn = await connection

      let song = await r.db('test').table('songs').get(id).delete({ returnChanges: true }).run(conn)
      let deleted = song.changes

      return deleted
    }

    return Promise.resolve(tasks())
  }
}

module.exports = Db
