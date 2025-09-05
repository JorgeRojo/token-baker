function Versions(): React.JSX.Element {
  const versions = window.electron.process.versions;

  return (
    <ul className="versions">
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
    </ul>
  );
}

export default Versions;
