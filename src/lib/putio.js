import { PUTIO_CLIENT_ID } from '../constants'
import PutioAPI from '@putdotio/api-client'

const putio = new PutioAPI({ clientID: PUTIO_CLIENT_ID })

function recursiveVideos(id, cb) {
  this.Files.Query(id)
    .then(
      resp => {
        var file_type = resp.data.parent.file_type
        if (file_type === 'FOLDER') {
          for (let f of resp.data.files)
            this.recursiveVideos(f.id, cb)
        } else if (file_type === 'VIDEO') {
          cb(resp.data.parent)
        }
      }
    )
}

putio.recursiveVideos = recursiveVideos.bind(putio)

export default putio