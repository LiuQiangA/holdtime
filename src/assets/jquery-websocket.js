/**
 * websocket jquery 封装插件 弹窗提示依赖layer
 */
(function($, window) {
    $.extend({
        websocketSettings: {
            open: function() {},
            close: function() {},
            message: function() {},
            error: function() {},
            options: {},
            events: {},
            isDebug: false
        },
        websocket: function(url, s) {
            var _self = this;
            _self.isReConnect = true;
            _self._settings = $.extend({}, $.websocketSettings, s);

            //创建websocket对象
            (_self.connect = function() {
                if(_self.ws == null || _self.ws.readyState != 1) {
                    var ws = 'WebSocket' in window ? new WebSocket(url) :
                        'MozWebSocket' in window ? new MozWebSocket(url) :
                        layer.alert('当前浏览器版本太低,不支持webscoket! <br/>请使用<a href="https://www.baidu.com/s?wd=chrome下载" target="_blank">chrome</a> 或者 IE10及以上版本的浏览器！');
                    //绑定事件
                    $(ws)
                        .on('open', _self._settings.open)
                        .on('open', function() {
                        	log.d("启动心跳...");
                            heartCheck.start();
                        })
                        .on('close', function() {
                        	if (_self.isReConnect) {
                            	log.d("启动重连...");
                            	_self.connect();
                        	}
                        })
                        .on('close', _self._settings.close)
                        .on('error', _self._settings.error)
                        .on('message', function() {
                            heartCheck.reset();
                        })
                        .on('message', _self._settings.message)
                        .on('message', function(e) {
                            var m = eval('(' + e.originalEvent.data + ')');
                            var h = _self._settings.events[m.name];
                            if(h)
                                h.call(this, m);
                        });

                    _self.ws = ws;
                }
            })();

            _self.send = function(name, equipId, param) {
                var m = {
                    name: name,
                    equipId: equipId
                };

                if(param)
                    m['param'] = param;
                return _self.ws.send($.toJSON ? $.toJSON(m) : JSON.stringify(m));
            };
            
            _self.close = function(){
            	heartCheck.stop();
            	_self.isReConnect = false;
            	_self.ws.close();
            	_self.ws = null;
            };

            //心跳机制
            var heartCheck = {
                timeout: _self._settings.timeout || 60000, //默认60秒
                timeoutObj: null,
                reset: function() {
                	log.d("刷新心跳...");
                    clearTimeout(this.timeoutObj);
                    this.start();
                },
                start: function() {
                    this.timeoutObj = setTimeout(function() {
                    	log.d("发送心跳...");
                        _self.send("HeartBeat", "beat");
                    }, this.timeout)
                },
                stop: function() {
                	log.d("停止心跳...");
                	clearTimeout(this.timeoutObj);
                }
            }
            //调试日志
            var log = {
            	d: function(msg){
            		if (_self._settings.isDebug) {
            			console.debug("websocket:", msg);
            		}
            	}
            };

//          $(window).unload(function() {
//              _self.ws.close();
//              _self.ws = null
//          });
            return _self;
        }
    });
})(jQuery, window);