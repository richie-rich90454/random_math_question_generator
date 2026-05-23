/** @vitest-environment jsdom */
import {describe, it, expect, vi, beforeEach} from "vitest";
import {generateAreaCircle, generateVolumeSphere, generatePythagorean, generatePerimeter, getMaxForDifficulty, cleanupVisualization} from "./index.js";
import {questionArea} from "../../script.js";
vi.mock("../../script.js", ()=>({
    questionArea: null as HTMLDivElement | null,
}));
vi.mock("./geometryUtils.js", ()=>({
    getMaxForDifficulty: vi.fn((_diff?: string, baseMax: number=10)=>baseMax),
    cleanupVisualization: vi.fn(),
}));
vi.mock("./geometryVisualization.js", ()=>({
    createVisualization: vi.fn(),
}));
vi.mock("three", ()=>{
    return {
        default: {
            WebGLRenderer: vi.fn(()=>({
                setSize: vi.fn(),
                domElement: document.createElement("canvas"),
                render: vi.fn(),
                dispose: vi.fn(),
            })),
            Scene: vi.fn(()=>({
                add: vi.fn(),
                remove: vi.fn(),
            })),
            PerspectiveCamera: vi.fn(()=>({
                position: {set: vi.fn()},
                lookAt: vi.fn(),
            })),
            BoxGeometry: vi.fn(()=>({})),
            MeshStandardMaterial: vi.fn(()=>({})),
            Mesh: vi.fn(()=>({
                position: {set: vi.fn()},
                rotation: {set: vi.fn()},
            })),
            AmbientLight: vi.fn(()=>({})),
            DirectionalLight: vi.fn(()=>({})),
            Vector3: vi.fn(()=>({})),
            Color: vi.fn(()=>({})),
        },
        WebGLRenderer: vi.fn(()=>({
            setSize: vi.fn(),
            domElement: document.createElement("canvas"),
            render: vi.fn(),
            dispose: vi.fn(),
        })),
        Scene: vi.fn(()=>({
            add: vi.fn(),
            remove: vi.fn(),
        })),
        PerspectiveCamera: vi.fn(()=>({
            position: {set: vi.fn()},
            lookAt: vi.fn(),
        })),
        BoxGeometry: vi.fn(()=>({})),
        MeshStandardMaterial: vi.fn(()=>({})),
        Mesh: vi.fn(()=>({
            position: {set: vi.fn()},
            rotation: {set: vi.fn()},
        })),
        AmbientLight: vi.fn(()=>({})),
        DirectionalLight: vi.fn(()=>({})),
        Vector3: vi.fn(()=>({})),
        Color: vi.fn(()=>({})),
        sRGBEncoding: 3001,
    };
});
vi.mock("three/examples/jsm/controls/OrbitControls.js", ()=>({
    OrbitControls: vi.fn(()=>({
        enableDamping: true,
        update: vi.fn(),
        dispose: vi.fn(),
    })),
}));
vi.mock("three/examples/jsm/renderers/CSS2DRenderer.js", ()=>({
    CSS2DRenderer: vi.fn(()=>({
        setSize: vi.fn(),
        domElement: document.createElement("div"),
        render: vi.fn(),
        dispose: vi.fn(),
    })),
    CSS2DObject: vi.fn(()=>({})),
}));
describe("Geometry generators", ()=>{
    let mockDiv: HTMLDivElement;
    beforeEach(()=>{
        mockDiv=document.createElement("div");
        (questionArea as any)=mockDiv;
        window.correctAnswer={correct: "", alternate: "", display: ""};
        window.expectedFormat="";
        (window as any).MathJax={typesetPromise: vi.fn(()=>Promise.resolve())};
    });
    it("returns early if questionArea is null for generateAreaCircle", ()=>{
        (questionArea as any)=null;
        generateAreaCircle("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("returns early if questionArea is null for generateVolumeSphere", ()=>{
        (questionArea as any)=null;
        generateVolumeSphere("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("returns early if questionArea is null for generatePythagorean", ()=>{
        (questionArea as any)=null;
        generatePythagorean("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("returns early if questionArea is null for generatePerimeter", ()=>{
        (questionArea as any)=null;
        generatePerimeter("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("generateAreaCircle creates question with medium difficulty", ()=>{
        generateAreaCircle("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generateVolumeSphere creates question with medium difficulty", ()=>{
        generateVolumeSphere("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generatePythagorean creates question with medium difficulty", ()=>{
        generatePythagorean("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generatePerimeter creates question with medium difficulty", ()=>{
        generatePerimeter("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("does not call MathJax.typesetPromise if MathJax is missing", ()=>{
        delete (window as any).MathJax;
        generateAreaCircle("medium");
        expect((window as any).MathJax).toBeUndefined();
    });
    it("calls getMaxForDifficulty with provided difficulty", ()=>{
        let mockGetMax=vi.mocked(getMaxForDifficulty);
        mockGetMax.mockClear();
        mockGetMax.mockReturnValueOnce(15);
        generateAreaCircle("hard");
        expect(mockGetMax).toHaveBeenCalled();
    });
    it("utility functions are exported", ()=>{
        expect(typeof getMaxForDifficulty).toBe("function");
        expect(typeof cleanupVisualization).toBe("function");
    });
});
