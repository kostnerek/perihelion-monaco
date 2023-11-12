import { VFC, useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './Editor.module.css';
import { interfaces } from './interfaces.node';
import { exampleNodeCode } from './example.node';
import { utilInterface } from './util.interface';
import { cvIndex, cvTypes } from './opencv.d';


export const Editor: VFC = () => {
	const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef(null);

	monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
	    target: monaco.languages.typescript.ScriptTarget.ES2016,
	    allowNonTsExtensions: true,
	    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
	    module: monaco.languages.typescript.ModuleKind.CommonJS,
	    noEmit: true,
	    typeRoots: ["node_modules/@types"]
	});
	
	monaco.languages.typescript.typescriptDefaults.addExtraLib(
		`declare var module: any;`,
		'polyfill.d.ts'
	);

	monaco.languages.typescript.typescriptDefaults.addExtraLib(
		utilInterface, 
		"file:///src/main/utils/img.util.d.ts"
	);

	monaco.languages.typescript.typescriptDefaults.addExtraLib(
		interfaces,
		"file:///src/data/node.interface.d.ts"
	)

	monaco.languages.typescript.typescriptDefaults.addExtraLib(
		cvTypes,
		"file:///node_modules/@types/cv-types/index.d.ts"
	)

	monaco.languages.typescript.typescriptDefaults.addExtraLib(
		cvIndex,
		"file:///node_modules/@types/opencv-wasm/index.d.ts"
	)


	console.log(monaco.languages.typescript.typescriptDefaults.getExtraLibs());
	
	monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
	    noSemanticValidation: false,
	    noSyntaxValidation: false
	})
	
	const transpile = () => {
		const code = editor?.getValue() || '';
		console.log(code);
	}


	useEffect(() => {
		if (monacoEl) {
			setEditor((editor) => {
				if (editor) return editor;

				const model = monaco.editor.createModel(
					exampleNodeCode,
					'typescript',
					monaco.Uri.parse('file:///main.tsx')
				);
				
				return monaco.editor.create(monacoEl.current!, {model});
			});
		}

		return () => editor?.dispose();
	}, [monacoEl.current]);

	return <><div className={styles.Editor} ref={monacoEl}></div><button onClick={()=>{transpile()}}>essa</button></>;
};
