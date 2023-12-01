import styled, { css } from 'styled-components';

interface TextNodeProps {
    text: string;
    key: string;
    active: boolean;
}

interface StyledTextNodeProps {
    active: boolean;
}

const StyledTextNode = styled.div<StyledTextNodeProps>`
    border-radius: 0px;
    padding: 5px 10px;
    box-shadow: none;
    &:hover,
    &:focus {
        background-color: ${(props) => props.theme.colors.info};
    }
    ${(props) =>
        props.active &&
        css`
            background-color: ${(props) => props.theme.colors.soft};
            color: ${(props) => props.theme.colors.dark};
        `}
`;

function TextNode({ text, key, active }: TextNodeProps) {
    return (
        <StyledTextNode key={key} active={active}>
            {text}
        </StyledTextNode>
    );
}


export default TextNode;