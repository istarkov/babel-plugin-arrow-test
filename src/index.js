export default ({
  types: t,
}) => ({
  visitor: {
    ArrowFunctionExpression(path, { opts: { regexp = '@t\\(([^\\)]+)\\)' } = {} }) {
      const re = new RegExp(regexp);

      if (path.node.leadingComments === undefined) return;
      const commentWithName = path.node.leadingComments
        .find(({ value }) => re.test(value));

      if (commentWithName === undefined) return;

      const [, exportName] = commentWithName.value.match(re);

      let pathRoot = path;
      while (!pathRoot.isProgram()) {
        pathRoot = pathRoot.parentPath;
      }

      const copyNode = t.cloneDeep(path.node);
      copyNode.leadingComments = undefined;

      pathRoot.unshiftContainer(
        'body',
        [
          t.variableDeclaration(
            'const',
            [
              t.variableDeclarator(t.identifier(exportName), copyNode),
            ]
          ),
          t.exportNamedDeclaration(
            null,
            [
              t.exportSpecifier(t.identifier(exportName), t.identifier(exportName)),
            ]
          ),
        ]
      );
    },
  },
});
