<template>
    <div id="ProjectTaboo" class="bg-white">
        <el-button @click="save">保存</el-button>
        <div :id="id" />
    </div>
</template>

<script>
import "codemirror/lib/codemirror.css"; // codemirror
import "tui-editor/dist/tui-editor.css"; // editor ui
import "tui-editor/dist/tui-editor-contents.css"; // editor content

import Editor from "tui-editor";
import defaultOptions from "./default-options";

export default {
    name: "ProjectTaboo",
    props: {
        introduction: {
            type: String,
            default: ""
        },
        value: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            required: false,
            default() {
                return (
                    "markdown-editor-" +
                    +new Date() +
                    ((Math.random() * 1000).toFixed(0) + "")
                );
            }
        },
        options: {
            type: Object,
            default() {
                return defaultOptions;
            }
        },
        mode: {
            type: String,
            default: "markdown"
        },
        height: {
            type: String,
            required: false,
            default: "768px"
        },
        language: {
            type: String,
            required: false,
            default: "en_US" // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
        }
    },
    data() {
        return {
            editor: null,
            timer: null,
            doc: {},
            form: {
                title: "",
                type: "技师公告",
                role: "技师"
            }
        };
    },
    computed: {
        editorOptions() {
            const options = Object.assign({}, defaultOptions, this.options);
            options.initialEditType = this.mode;
            options.height = this.height;
            options.language = this.language;
            return options;
        }
    },
    watch: {
        value(newValue, preValue) {
            console.log(newValue, preValue);
            if (newValue !== preValue && newValue !== this.editor.getValue()) {
                this.editor.setValue(newValue);
            }
        },
        language(val) {
            this.destroyEditor();
            this.initEditor();
        },
        height(newValue) {
            this.editor.height(newValue);
        },
        mode(newValue) {
            this.editor.changeMode(newValue);
        }
    },
    destroyed() {
        this.destroyEditor();
    },
    methods: {
        initEditor() {
            this.editor = new Editor({
                el: document.getElementById(this.id),
                ...this.editorOptions
            });
            if (this.value) {
                this.editor.setValue(this.value);
            }
            this.editor.on("change", () => {
                this.$emit("input", this.editor.getValue());
            });
            this.setHtml(this.$store.state.taboo);
        },
        destroyEditor() {
            if (!this.editor) return;
            this.editor.off("change");
            this.editor.remove();
        },
        setValue(value) {
            this.editor.setValue(value);
        },
        getValue() {
            return this.editor.getValue();
        },
        setHtml(value) {
            this.editor.setHtml(value);
        },
        getHtml() {
            return this.editor.getHtml();
        },
        updateFile(data) {},
        async createAndUpdate() {
            if (!this.form.title) {
                this.$message.error("请输入标题");
                return false;
            }
            const res = await this.$api.post("/announce/createAndUpdate", {
                _id: this.doc._id || "",
                type: this.form.type,
                role: this.form.role,
                title: this.form.title,
                content: this.getHtml()
            });
            if (res.data.success) {
                this.$message.success("创建 或 更新成功");
                this.$router.push("/");
            } else {
                this.$message.error("请求失败");
            }
        },
        async save() {
            // this.$message.success('每5秒保存一次文档')
            // this.timer = setInterval(async () => {
            //     this.$message.error('保存中')
            // }, 5000)
            this.$store.state.notice = this.getHtml();
        }
    },
    mounted() {
        this.initEditor();
    },
    created() {}
};
</script>
