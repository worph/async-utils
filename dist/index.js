var o=class{cleaners=[];add(e){this.cleaners.push(e)}cleaner(){return()=>{this.cleanUp()}}cleanUp(){for(let e of this.cleaners)e();this.cleaners=[]}};function l(s){let e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=t.length;for(let r=0;r<s;r++)e+=t.charAt(Math.floor(Math.random()*i));return e}var a=class{constructor(e=!1){this.onlyLast=e;this.cancelAll()}nextPromise=Promise.resolve(null);canceled={};queueSize=0;queueID=0;getQueueSize(){return this.queueSize}async awaitQueueEmpty(){for(await this.nextPromise;this.queueSize!=0;)await this.nextPromise}add(e,t=null){t||(t="promise-"+l(8));let i=this.nextPromise;this.queueSize++;let r=this.queueID,u=null;return u=(async()=>{this.queueSize--;try{await i}catch{}if(r!==this.queueID)throw new Error("canceled caused by new queue");if(this.canceled[t])throw delete this.canceled[t],new Error("canceled by user");if(this.onlyLast&&u!=this.nextPromise)throw new Error("canceled caused by not last");return e()})(),u.catch(c=>{}),this.nextPromise=u,{id:t,promise:this.nextPromise}}cancel(e){this.canceled[e]=!0}async cancelAll(){this.queueID++,await this.awaitQueueEmpty(),this.nextPromise=Promise.resolve(null),this.canceled={},this.queueSize=0}};var n=class{queues;constructor(e=1){if(e<1)throw new Error("concurrentTask must be >=1");this.queues=[];for(let t=0;t<e;t++)this.queues.push(new a)}getQueueSize(){let e=0;for(let t of this.queues)e+=t.getQueueSize();return e}async awaitQueueEmpty(){for(let e of this.queues)await e.awaitQueueEmpty()}add(e,t=null){let i=this.queues[0];for(let r=1;r<this.queues.length;r++)this.queues[r].getQueueSize()<i.getQueueSize()&&(i=this.queues[r]);return i.add(e,t)}cancel(e){for(let t of this.queues)t.cancel(e)}async cancelAll(){for(let e of this.queues)await e.cancelAll()}};export{o as ListenerCleaner,n as MultiQueue,a as PromiseQueue,l as makeid};
//# sourceMappingURL=index.js.map