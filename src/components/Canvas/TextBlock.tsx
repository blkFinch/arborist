import * as Toolbar from '@radix-ui/react-toolbar';

interface textBlockProps {
    addBlock: () => void;
}

function TextBlock({addBlock}: textBlockProps) {
    return (
        <div>
        <div>TextBlock</div>
        <textarea id="text-node"></textarea>
        <Toolbar.Root>
            <Toolbar.Button onClick={addBlock} >new</Toolbar.Button>
            <Toolbar.Button>child</Toolbar.Button>
        </Toolbar.Root>
        </div>
    );
}

export default TextBlock;
