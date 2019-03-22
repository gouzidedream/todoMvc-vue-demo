(function (window) {
	'use strict';

	let list = JSON.parse(localStorage.getItem('list') || '[]')
	const vm = new Vue({
		el : '.todoapp',
		data : {
			list,
		// 待办事项
			addToDo : '',
		// 编辑功能标记
			editId : -1,
		// 修改之前内容的缓存
			beforChange : ''
		},
		// 监听数据变化
		watch : {
			list : {
				deep : true,
				handler (newList) {
					localStorage.setItem('list', JSON.stringify(newList))
				}
			}
		},
		// 删除功能 
		methods : {
			delToDo (id) {
				this.list = this.list.filter(item => item.id != id)
			},
		// 输入待办项
			putToDo () {
				// 获取输入值
				let txt = this.addToDo.trim()
				if (txt.length === 0) {
					return this.addToDo = ''
				}
				// 标记完成状态
				let isTrue = false
				// 匹配数组中是否存在
				let arr = []
				this.list.forEach(item => {
					arr.push(item.todoName)
				})
				// 数组中存在的处理
				if (arr.indexOf(txt) != -1) {
					isTrue= this.list.find(item => item.todoName == txt).done
					this.list = this.list.filter(item => item.todoName != txt)
				}
				// 添加数组中不存在项
				let id = 
					this.list.length === 0 ? 1 :  this.list[0].id + 1
				let obj = {
					id : id, 
					todoName : this.addToDo, 
					done : isTrue
				}
				this.list.unshift(obj)
				this.addToDo = ''
			},
		// 编辑功能
			changeTxt (id) {
				this.editId = id
				this.beforChange = this.list.filter(item => item.id == id)[0].todoName
			},
		// 输入功能
			add (id) {
				let obj = this.list.filter(item => item.id == id)
				if (obj[0].todoName.trim().length === 0) {
					obj[0].todoName = this.beforChange
				}
				this.editId = -1
			},
		// 清除完成项
			clearCom () {
				this.list = this.list.filter(item => !item.done)
			}
		},
		// 底部隐藏
		computed : {
			isFootShow () {
				return this.list.length > 0
			},
			// 完成项
			numLeft () {
				return this.list.filter(item => !item.done).length
			},
		}
	})
})(window);
