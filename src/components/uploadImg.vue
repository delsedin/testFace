<template>
    <div>
        <h2>测试你是什么属性</h2>
        <form>
            <div id="faceWrap" class="face-wrap">
                <img v-if="isSelectImg == 1" v-bind:src="imgSrc"  class="selected-img">
                <span v-else>+</span>
            </div>
            <div id="uploadWrap" class="upload-wrap">
                点击上传一张看得清脸的照片
                <input id="uploadImg" class="upload-img" type="file" accept="image/*" placeholder="打开照片" @change="uploadImg">
            </div>
        </form>
        
    </div>
</template>

<script>
    export default {
        name: 'uploadImg',
        data: function() {
            return {
                result: null,
                imgSrc: '',
                isDone: 0,
                isSelectImg: 0
            }
        },
        methods: {
            uploadImg: function(e) {
                let that = this;
                let file = e.target.files[0] || '';
                if (file.length === 0) return;

                let reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = function (e) {
                    that.isSelectImg = 1;
                    that.imgSrc = this.result;
                    that.getInfo(file);
                }
            },
            getInfo: function(img){
                let that = this;
                const  url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
               
                let configForm = that.makeFormData({
                    api_secret: 'Hqq5za4kPaH0bucUNeCMIjnvy-5SplnX',
                    api_key: 'DQ6Yq7oE07oueQriiUlHkaoRHZewmVGb',
                    image_file: img,
                    return_landmark: 1,//0：不检测及返回人脸关键点
                    return_attributes: 'gender,age,smiling,glass,facequality,emotion,ethnicity,beauty,mouthstatus,skinstatus' //返回根据人脸特征判断出的年龄、性别、情绪等属性。
                })

                axios.post(url, configForm).then( response => {
                    that.reanalysis(response.data.faces[0].attributes)
                }).catch( e => {
                    alert('昝维错啦')
                })
            },
            makeFormData: function(params) {
                let formData = new FormData();
                for (let key in params) {
                    formData.append(key, params[key] === undefined ? '' : params[key]);
                }
                return formData;
            },
            reanalysis: function(result) {
                this.isDone = 1;
                this.result = result;
            }
        }
    }
</script>

<style scoped lang="less">
    h2 {
        text-align: center;
        color: #fff;
        margin: 0;
    }
    form {
        padding: 30px 0;
        border-radius: 8px;
        margin-bottom: 30px;
        margin: 50px;
    }
    .face-wrap {
        width: 240px;
        height: 200px;
        margin:0 auto 10px;
        line-height: 200px;
        border: 2px solid #aaa;
        vertical-align: middle;
        text-align: center;
        font-size: 28px;
        overflow: hidden;
    }
    .selected-img {
        height: 100%;
        width: auto;
    }
    .btn {
        cursor: pointer;
    }
    .upload-wrap{
        position: relative;
        width: 244px;
        height: 30px;
        margin: 15px auto 0;
        text-align: center;
        line-height: 30px;
        border-radius: 3px;
    }
    .upload-img {
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;

        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .detect-btn {
        margin: 20px auto 0;
        width: 60px;
        line-height: 60px;
        text-align: center;
        border-radius: 50%;
        border: 3px solid #FFAF00;
    }
    .result {
        color: #fff;
    }

    .viewport.blue{
        h2 { color: #E95D5C; }
        form { background: #90CDE9; }
        .face-wrap {
            color: #83C1F2;
            border-color: #83C1F2;
            background: #CFEBF4;
        }
        .upload-wrap {
            background: #90CDE9;
            color: #F5FBFC; 
        }
    }
</style>