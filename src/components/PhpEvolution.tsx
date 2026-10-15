"use client";

import { useEffect, useState } from "react";
import { activeStageFromTops } from "../lib/php-evolution.mjs";
import { useLanguage } from "./LanguageProvider";

const stagesPt = [
  {
    label: "PHP básico",
    file: "hello.php",
    code: ['<?php', '', '$nome = "Luan";', 'echo "Olá, {$nome}!";'],
  },
  {
    label: "Lógica e funções",
    file: "MediaCalculator.php",
    code: [
      '<?php',
      '',
      'function calcularMedia(array $notas): float',
      '{',
      '    return array_sum($notas) / count($notas);',
      '}',
    ],
  },
  {
    label: "Código organizado",
    file: "ProjectService.php",
    code: [
      '<?php',
      '',
      'final class ProjectService',
      '{',
      '    public function create(array $data): Project',
      '    {',
      '        return Project::query()->create($data);',
      '    }',
      '}',
    ],
  },
  {
    label: "Controller Laravel",
    file: "ProjectController.php",
    code: [
      '<?php',
      '',
      'final class ProjectController extends Controller',
      '{',
      '    public function index(ProjectService $service)',
      '    {',
      '        return ProjectResource::collection($service->all());',
      '    }',
      '}',
    ],
  },
] as const;

const stagesEn = [
  {
    label: "Basic PHP",
    file: "hello.php",
    code: ['<?php', '', '$name = "Luan";', 'echo "Hello, {$name}!";'],
  },
  {
    label: "Logic and functions",
    file: "AverageCalculator.php",
    code: [
      '<?php',
      '',
      'function calculateAverage(array $grades): float',
      '{',
      '    return array_sum($grades) / count($grades);',
      '}',
    ],
  },
  {
    label: "Organized code",
    file: "ProjectService.php",
    code: [
      '<?php',
      '',
      'final class ProjectService',
      '{',
      '    public function create(array $data): Project',
      '    {',
      '        return Project::query()->create($data);',
      '    }',
      '}',
    ],
  },
  {
    label: "Laravel controller",
    file: "ProjectController.php",
    code: [
      '<?php',
      '',
      'final class ProjectController extends Controller',
      '{',
      '    public function index(ProjectService $service)',
      '    {',
      '        return ProjectResource::collection($service->all());',
      '    }',
      '}',
    ],
  },
] as const;

function renderLine(line: string) {
  const parts = line.split(/(\$[\w]+|\b(?:class|extends|final|function|namespace|public|return|use)\b|"[^"]*")/g);

  return parts.map((part, index) => {
    if (!part) return null;

    const className = part.startsWith("$")
      ? "code-variable"
      : part.startsWith('"')
        ? "code-string"
        : /^(class|extends|final|function|namespace|public|return|use)$/.test(part)
          ? "code-keyword"
          : undefined;

    return (
      <span className={className} key={`${part}-${index}`}>
        {part}
      </span>
    );
  });
}

type PhpEvolutionProps = {
  stage?: number;
  compact?: boolean;
};

export default function PhpEvolution({ stage: fixedStage, compact = false }: PhpEvolutionProps) {
  const { language } = useLanguage();
  const stages = language === "en" ? stagesEn : stagesPt;
  const [activeStage, setActiveStage] = useState(0);
  const stage = Math.min(Math.max(fixedStage ?? activeStage, 0), stages.length - 1);
  const currentStage = stages[stage];

  useEffect(() => {
    if (fixedStage !== undefined) return;

    const timelineItems = Array.from(document.querySelectorAll<HTMLElement>("[data-timeline-step]"));
    if (!timelineItems.length) return;

    let frame = 0;

    const updateStage = () => {
      frame = 0;
      const triggerLine = window.innerHeight * 0.62;
      const nextStage = activeStageFromTops(
        timelineItems.map((item) => item.getBoundingClientRect().top),
        triggerLine,
      );

      setActiveStage((current) => (current === nextStage ? current : nextStage));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateStage);
    };

    frame = window.requestAnimationFrame(updateStage);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [fixedStage]);

  return (
    <aside
      className={`php-evolution${compact ? " is-compact" : ""}`}
      tabIndex={compact ? 0 : undefined}
      aria-label={language === "en" ? `PHP code evolution: ${currentStage.label}` : `Evolução do código PHP: ${currentStage.label}`}
    >
      <div className="code-window">
        <div className="code-window-bar" aria-hidden="true">
          <span>{currentStage.file}</span>
          {!compact && (
            <span className="code-window-count">
              {String(stage + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
            </span>
          )}
        </div>

        <div className="code-stage" key={stage}>
          <p className="code-stage-label">{currentStage.label}</p>
          <pre>
            <code>
              {currentStage.code.map((line, index) => (
                <span
                  className="code-line"
                  key={`${stage}-${index}`}
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <span className="code-line-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{renderLine(line)}</span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {!compact && (
        <ol className="code-progress" aria-label={language === "en" ? "Code evolution stages" : "Etapas da evolução do código"}>
          {stages.map((item, index) => (
            <li className={index <= stage ? "is-active" : ""} key={item.label}>
              <span aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
