<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

let ws: WebSocket;

const isShowChat = ref(false);
const chatMes = ref(false);
const isOnline = ref(true);
const username = ref("");
const toName = ref("");
const inputMessage = ref("");
const historyMessage = ref([]);
const friendsList = ref([]);
const systemMessages = ref([]);

const init = async () => {
    const res = await axios.get("user/getUsername");
    username.value = res.data;

    ws = new WebSocket("ws://localhost/chat");
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onclose = onClose;
};

const showChat = (name: string) => {
    toName.value = name;
    const history = sessionStorage.getItem(toName.value);
    if (!history) {
        historyMessage.value = [];
    } else {
        historyMessage.value = JSON.parse(history);
    }
    isShowChat.value = true;
    chatMes.value = true;
};

const submit = () => {
    const sendMessage = { toName: toName.value, message: inputMessage.value };
    historyMessage.value.push(JSON.parse(JSON.stringify(sendMessage)));
    sessionStorage.setItem(toName.value, JSON.stringify(historyMessage.value));
    ws.send(JSON.stringify(sendMessage));
    inputMessage.value = "";
};

const onOpen = () => {
    isOnline.value = true;
};

const onClose = () => {
    isOnline.value = false;
};

const onMessage = (evt: MessageEvent) => {
    const dataStr = evt.data;
    const res = JSON.parse(dataStr);

    if (res.system) {
        const names = res.message;
        friendsList.value = [];
        systemMessages.value = [];
        for (let i = 0; i < names.length; i++) {
            if (names[i] !== username.value) {
                friendsList.value.push(names[i]);
                systemMessages.value.push(names[i]);
            }
        }
    } else {
        const history = sessionStorage.getItem(res.fromName);
        if (!history) {
            historyMessage.value = [res];
        } else {
            historyMessage.value.push(res);
        }
        sessionStorage.setItem(res.fromName, JSON.stringify(historyMessage.value));
    }
};
</script>
  
 
<template>
    <div>

        <!-- <img style="width:100%;height:100%" src="img/chat_bg.jpg"> -->

        <div class="abs cover contaniner" >
            <div class="abs cover pnl">
                <div class="top pnl-head" style="padding: 20px ; color: white;">
                    <div id="userName">
                        用户：{{ username }}
                        <span style='float: right;color: green' v-if="isOnline">在线</span>
                        <span style='float: right;color: red' v-else>离线</span>
                    </div>
                    <div id="chatMes" v-show="chatMes" style="text-align: center;color: #6fbdf3;font-family: 新宋体">
                        正在和 <font face="楷体">{{ toName }}</font> 聊天
                    </div>
                </div>
                <!--聊天区开始-->
                <div class="abs cover pnl-body" id="pnlBody">
                    <div class="abs cover pnl-left" id="initBackground" style="background-color: white; width: 100%">
                        <div class="abs cover pnl-left" id="chatArea" v-show="isShowChat">
                            <div class="abs cover pnl-msgs scroll" id="show">
                                <div class="pnl-list" id="hists"><!-- 历史消息 --></div>
                                <div class="pnl-list" id="msgs" v-for="message in historyMessage">

                                    <!-- 消息这展示区域 -->
                                    <div class="msg guest" v-if="message.toName">
                                        <div class="msg-right">
                                            <div class="msg-host headDefault"></div>
                                            <div class="msg-ball">{{ message.message }}</div>
                                        </div>
                                    </div>
                                    <div class="msg robot" v-else>
                                        <div class="msg-left" worker="">
                                            <div class="msg-host photo"
                                                style="background-image: url(img/avatar/Member002.jpg)"></div>
                                            <div class="msg-ball">{{ message.message }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="abs bottom pnl-text">
                                <div class="abs cover pnl-input">
                                    <textarea class="scroll" id="context_text" @keyup.enter="submit" wrap="hard"
                                        placeholder="在此输入文字信息..." v-model="sendMessage.message"></textarea>
                                    <div class="abs atcom-pnl scroll hide" id="atcomPnl">
                                        <ul class="atcom" id="atcom"></ul>
                                    </div>
                                </div>

                                <div class="abs br pnl-btn" id="submit" @click="submit"
                                    style="background-color: rgb(32, 196, 202); color: rgb(255, 255, 255);">
                                    发送
                                </div>
                                <div class="pnl-support" id="copyright"><a href="http://www.itcast.cn">传智播客,版本所有</a></div>
                            </div>
                        </div>

                        <!--聊天区 结束-->
                        <div class="abs right pnl-right">
                            <div class="slider-container hide"></div>
                            <div class="pnl-right-content">
                                <div class="pnl-tabs">
                                    <div class="tab-btn active" id="hot-tab">好友列表</div>
                                </div>
                                <div class="pnl-hot">
                                    <ul class="rel-list unselect">
                                        <li class="rel-item" v-for="friend in friendsList"><a @click='showChat(friend)'>{{
                                            friend }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="pnl-right-content">
                                <div class="pnl-tabs">
                                    <div class="tab-btn active">系统广播</div>
                                </div>
                                <div class="pnl-hot">
                                    <ul class="rel-list unselect" id="broadcastList">
                                        <li class="rel-item" style="color: #9d9d9d;font-family: 宋体"
                                            v-for="name in systemMessages">您的好友
                                            {{ name }} 已上线</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style  scoped>

</style>