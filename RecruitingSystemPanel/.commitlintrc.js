/**
 * git commit -m "规则"
 * feat：新功能
 * fix：修补某功能的bug
 * perf: 优化相关，比如提升性能、体验
 * refactor：重构某个功能
 * build: 优化构建工具或运行时性能
 * style：仅样式改动
 * docs：仅文档新增/改动
 * chore：构建过程或辅助工具的变动
 * ci: 持续集成修改
 * build: 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
 * updatePlugins: 更新Plugins
 * clean: 清除无用代码
 */

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'perf', 'refactor', 'build', 'style', 'docs', 'chore', 'ci', 'revert', 'plug', 'clean'],
        ],
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72],
    },
}
