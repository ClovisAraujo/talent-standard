﻿/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        const imageFile = props.imageFile
        const imageURL = props.imageURL


        this.state = {
            selectedFileName: [],
            imageId: [],
            selectedRemoveFileId: [],
            currentNoOfFiles: 0,

            imageSrc: imageURL,
            selectedFile: imageFile,

            fileSelectedToUpload: false
        }

        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.maxFileSize = 2097152;
        this.maxNoOfFiles = 1;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

    };

    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.setState({
                imageSrc: this.props.imageURL,
                selectedFile: this.props.imageURL
            })
            console.log("load url", this.props.imageURL);
        }
    }


    fileSelectedHandler(event) {

        let localSelectedFile = this.state.selectedFile;
        let localSelectedFileName = this.state.selectedFileName;
        let localImageSrc = this.state.imageSrc;
        let localImageId = this.state.imageId;
        let localCurrentNoOfFiles = this.state.currentNoOfFiles;

        this.setState({
            fileSelectedToUpload: true
        })

        localSelectedFile = event.target.files[0];
        localImageSrc = window.URL.createObjectURL(event.target.files[0]);
        localImageId = '0';
        localCurrentNoOfFiles = localCurrentNoOfFiles + 1;


        console.log("fileSelectedHandler image", localSelectedFile);
        console.log("fileSelectedHandler url", localImageSrc);

        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            imageId: localImageId,
            currentNoOfFiles: localCurrentNoOfFiles
        })
    }

    removeFile(event) {
        let localselectedRemoveFileId = this.state.selectedRemoveFileId;
        let localSelectedFile = this.state.selectedFile;
        let localSelectedFileName = this.state.selectedFileName;
        let localImageSrc = this.state.imageSrc;
        let localImageId = this.state.imageId;
        let localCurrentNoOfFiles = this.state.currentNoOfFiles;

        localselectedRemoveFileId = localselectedRemoveFileId.concat(event.target.getAttribute('imageid'));
        localSelectedFile.splice(event.target.getAttribute('value'), 1);
        localSelectedFileName.splice(event.target.getAttribute('value'), 1);
        localImageSrc.splice(event.target.getAttribute('value'), 1);
        localImageId.splice(event.target.getAttribute('value'), 1);

        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            imageId: localImageId,
            selectedRemoveFileId: localselectedRemoveFileId,
            currentNoOfFiles: this.state.currentNoOfFiles - 1
        })
    }

    fileUploadHandler() {

        let data = new FormData();
        data.append('ProfilePhoto', this.state.selectedFile);
        data.append('ProfilePhotoUrl', this.state.imageSrc);

        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: 'http://clovisstmd2profile.azurewebsites.net/profile/profile/updateProfilePhoto',
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                console.log('testing res ' + res)
                if (res.success) {
                    console.log("success")
                    TalentUtil.notification.show("Image updated successfully", "success", null, null);
                    this.setState({
                        fileSelectedToUpload: false
                    })
                } else {
                    TalentUtil.notification.show("Image did not update successfully", "error", null, null);
                    this.setState({
                        fileSelectedToUpload: false
                    })
                }
            }.bind(this),
            error: function (res, status, error) {
                TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
                this.setState({
                    fileSelectedToUpload: false
                })
            }
        });

        this.setState({
            fileSelectedToUpload: false
        })

    }

    render() {
        console.log("render image: ", this.state.fileSelectedToUpload)
        console.log("render url: ", this.state.imageSrc)

        console.log("props: ", this.props.imageURL)
        return (
            <React.Fragment>
            <div className="column">
                <input type="file" onChange={this.fileSelectedHandler} className="inputfile" id="selectFile" style={{ display: 'none' }} />
                <label htmlFor="selectFile" className="work-sample-photo">
                    {this.state.selectedFile ?
                        (<img src={this.state.imageSrc} className="ui small circular image" ></img>)
                        :
                        <i className="ui huge camera retro icon circular" ></i>}
                    </label>
                    <br />
                <div className="row">
                        {this.state.fileSelectedToUpload ?
                            <div><button className="ui teal button buttonUplSize" type="button" onClick={this.fileUploadHandler}><i className="ui upload icon"></i>Upload</button></div>
                        :
                        null}
                </div>
                </div>
            </React.Fragment>
        )
    }
}