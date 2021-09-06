import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment'
import './App.css';

class Main extends Component {

  render() {
    return (
      <div>
        <h1 class="title" >
            <b /*className="container-fluid mt-5 text-center"*/><font face="serif">IPFS雲端資料庫</font></b>
          </h1>
        <div className="row">
          <div className="col">
            <ul class="script">
              <li>此網頁是一個雲端資料庫</li>
              <br></br>
              <li>您可以在此上傳您的個人檔案</li>
              <br></br>
              <li>所有上傳的資料將被放在IPFS系統上</li>
              <br></br>
              <li>您也可以將您上傳的檔案,通過分享HASH值得方法,分享給您的好友們</li>
            </ul>
          </div>
          <div className="col">
            <div calss="upload">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
                <div className="content">  
                  <p>&nbsp;</p>
                  <div style={{maxWidth: '512px', height : '400px' }}>
                      <form onSubmit={(event) => {
                        event.preventDefault()
                        const description = this.fileDescription.value
                        this.props.uploadFile(description)
                      }} action="upload.php" method="POST">

                        <input type="file" onChange={e=>{
                          this.props.captureFile(e);
                          document.getElementById("filename").innerHTML = `${e.target.files[0].name}`;
                          }} className="fileInput" id="fileInput" multiple/>
                        <p id="filename">Drag your files here or click in this area.</p>

                        {/*<input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>*/}
                        <div className="form-group">
                            <br></br>
                              <input
                                id="fileDescription"
                                type="text"
                                ref={(input) => { this.fileDescription = input }}
                                className="form-control text-monospace dcinput"
                                placeholder="description..."
                                required />
                        </div>
                        <button type="submit"><b>Upload</b></button>
                      </form>
                  </div>
                  <p>&nbsp;</p>
                  <table className="table-sm tb1 text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                    <thead style={{ 'fontSize': '15px' }}>
                      <tr className="bg-dark text-white">
                        <th scope="col" style={{ width: '10px'}}>id</th>
                        <th scope="col" style={{ width: '200px'}}>name</th>
                        <th scope="col" style={{ width: '230px'}}>description</th>
                        <th scope="col" style={{ width: '120px'}}>type</th>
                        <th scope="col" style={{ width: '90px'}}>size</th>
                        <th scope="col" style={{ width: '90px'}}>date</th>
                        <th scope="col" style={{ width: '120px'}}>uploader/view</th>
                        <th scope="col" style={{ width: '120px'}}>hash/view/get</th>
                      </tr>
                    </thead>
                    { this.props.files.map((file, key) => {
                      return(
                        <thead style={{ 'fontSize': '12px' }} key={key}>
                          <tr>
                            <td>{file.fileId}</td>
                            <td>{file.fileName}</td>
                            <td>{file.fileDescription}</td>
                            <td>{file.fileType}</td>
                            <td>{convertBytes(file.fileSize)}</td>
                            <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                            <td>
                              <a
                                href={"https://etherscan.io/address/" + file.uploader}
                                rel="noopener noreferrer"
                                target="_blank">
                                {file.uploader.substring(0,10)}...
                              </a>
                            </td>
                            <td>
                              <a
                                href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                                rel="noopener noreferrer"
                                target="_blank">
                                {file.fileHash.substring(0,10)}...
                              </a>
                            </td>
                          </tr>
                        </thead>
                      )
                    })}
                  </table>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;