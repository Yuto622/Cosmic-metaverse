import React, { useState } from 'react';
import { PlanetData, ActionType } from '../types';
import { X, Check, AlertCircle, ChevronRight, Share2, Globe, BookOpen, Brain, MessageCircle } from 'lucide-react';

interface DetailScreenProps {
  type: ActionType;
  planet: PlanetData;
  onClose: () => void;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ type, planet, onClose }) => {
  
  const renderContent = () => {
    switch (type) {
      case 'news':
        return <NewsContent planet={planet} />;
      case 'column':
        return <ColumnContent planet={planet} />;
      case 'quiz':
        return <QuizContent planet={planet} />;
      case 'english':
        return <EnglishContent planet={planet} />;
      default:
        return null;
    }
  };

  const getHeaderIcon = () => {
    switch (type) {
      case 'news': return <Globe className="w-6 h-6 text-cyan-400" />;
      case 'column': return <BookOpen className="w-6 h-6 text-blue-400" />;
      case 'quiz': return <Brain className="w-6 h-6 text-purple-400" />;
      case 'english': return <MessageCircle className="w-6 h-6 text-emerald-400" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'news': return 'PLANETARY NEWS';
      case 'column': return 'COSMIC COLUMN';
      case 'quiz': return 'KNOWLEDGE CHECK';
      case 'english': return 'LEARNING DATA';
    }
  };

  const getSubTitle = () => {
    switch (type) {
      case 'news': return '最新ニュース';
      case 'column': return '宇宙コラム';
      case 'quiz': return 'クイズに挑戦';
      case 'english': return '英語で学ぶ';
    }
  };

  const getThemeColor = () => {
    switch (type) {
      case 'news': return 'border-cyan-500 text-cyan-400';
      case 'column': return 'border-blue-500 text-blue-400';
      case 'quiz': return 'border-purple-500 text-purple-400';
      case 'english': return 'border-emerald-500 text-emerald-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Main Modal Window */}
      <div className={`relative w-full max-w-2xl bg-slate-950/90 border border-t-4 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh] ${getThemeColor().split(' ')[0]}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            {getHeaderIcon()}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-mono">{getTitle()}</span>
                <span className="text-[10px] bg-white/10 px-1 rounded text-white/50">{getSubTitle()}</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">{planet.name}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {renderContent()}
        </div>

        {/* Footer Decor */}
        <div className="h-2 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const NewsContent = ({ planet }: { planet: PlanetData }) => {
  // 惑星ごとのダミーニュース生成
  const getNews = (id: string) => {
    const common = [
      {
        title: `${planet.name}の軌道上に新たな宇宙塵を発見`,
        desc: `観測衛星からの最新データにより、${planet.name}の軌道周辺に微細な宇宙塵のリングが形成されている可能性が示唆されました。`
      },
      {
        title: `次世代${planet.name}探査機、設計段階へ`,
        desc: `国際宇宙機関は、${planet.name}の地表詳細マッピングを行うための次世代探査機の開発プロジェクトを承認しました。`
      }
    ];

    if (id === 'mars') {
      return [
        {
          title: "火星の地下湖、予想以上に広範囲か",
          desc: "地下レーダー探査の結果、火星の南極冠の下に存在する液体水の湖が、従来の予想よりも広範囲に広がっているデータが得られました。"
        },
        ...common
      ];
    }
    if (id === 'jupiter') {
      return [
        {
          title: "大赤斑の嵐、活動が活発化",
          desc: "木星の特徴である大赤斑の風速が、過去10年で最も速くなっていることが観測されました。気象メカニズムの解明が急がれます。"
        },
        ...common
      ];
    }
     if (id === 'saturn') {
      return [
        {
          title: "土星の輪に新しい「隙間」を確認",
          desc: "カッシーニ探査機のアーカイブデータの再解析により、土星のBリング内に未知の小衛星によって作られたと思われる微細な隙間が発見されました。"
        },
        ...common
      ];
    }
    return common;
  };

  const newsItems = getNews(planet.id);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-lg">
        <div className="flex justify-between items-start mb-2">
           <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">BREAKING NEWS</span>
           <span className="text-xs text-cyan-200/50">2時間前</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{newsItems[0].title}</h3>
        <p className="text-sm text-cyan-100/70 leading-relaxed">
          {newsItems[0].desc} 研究チームは、この発見が太陽系の形成過程を解明する重要な手がかりになると期待しています。
        </p>
        <div className="mt-4 flex items-center text-xs text-cyan-400 cursor-pointer hover:underline gap-1">
          記事の続きを読む <ChevronRight size={12} />
        </div>
      </div>

      <div className="space-y-4">
         {newsItems.slice(1).map((item, i) => (
           <div key={i} className="flex gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
              <div className="w-20 h-20 bg-cyan-900/40 rounded flex items-center justify-center shrink-0">
                 <Globe className="text-cyan-700/50 group-hover:text-cyan-500 transition-colors" />
              </div>
              <div>
                 <h4 className="text-white font-medium mb-1 group-hover:text-cyan-300 transition-colors">{item.title}</h4>
                 <p className="text-xs text-gray-400 line-clamp-2">
                   {item.desc}
                 </p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

const ColumnContent = ({ planet }: { planet: PlanetData }) => {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <div className="flex items-center gap-4 mb-6">
         <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl font-bold text-blue-300">
            {planet.name.charAt(0)}
         </div>
         <div>
            <h3 className="text-xl font-bold text-white m-0">{planet.name}の謎に迫る</h3>
            <p className="text-blue-200/60 text-xs m-0 mt-1">執筆: アストロ博士 • 読了時間 3分</p>
         </div>
      </div>
      
      <p className="text-gray-300 leading-7">
        なぜ<strong>{planet.name}</strong>はこれほどまでにユニークなのでしょうか？ 他の天体とは一線を画すその特徴は、私たちの想像力をかき立ててやみません。
      </p>
      
      <div className="my-6 border-l-4 border-blue-500/50 pl-4 italic text-blue-100/80 bg-blue-900/10 p-2 rounded-r">
        「{planet.descriptionJA}」
      </div>
      
      <p className="text-gray-300 leading-7">
        望遠鏡で{planet.name}を観測するとき、私たちは単に遠くの岩やガスの塊を見ているわけではありません。太陽系が誕生してから46億年という途方もない時間の積み重ねを目撃しているのです。
      </p>

      <h4 className="text-blue-300 font-bold mt-6 mb-2">探査の最前線</h4>
      <p className="text-gray-300 leading-7">
        近年の研究では、{planet.name}の環境が私たちが考えていたよりもはるかにダイナミックであることが分かってきました。今後の探査ミッションによって、教科書が書き換えられるような発見があるかもしれません。宇宙の旅はまだ始まったばかりなのです。
      </p>
    </div>
  );
};

const QuizContent = ({ planet }: { planet: PlanetData }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // 簡易的なクイズデータ生成
  const getQuizData = (id: string) => {
    switch (id) {
      case 'mercury':
        return {
          q: "水星の特徴として正しいものはどれ？",
          opts: ["太陽系で最も大きい", "昼と夜の温度差が激しい", "厚い大気がある"],
          ans: 1
        };
      case 'venus':
        return {
          q: "金星が「地球の双子」と呼ばれる理由は？",
          opts: ["大きさが似ているから", "水があるから", "緑が多いから"],
          ans: 0
        };
      case 'earth':
        return {
          q: "地球の表面の約何割が海で覆われている？",
          opts: ["約30%", "約50%", "約70%"],
          ans: 2
        };
      case 'mars':
        return {
          q: "火星が「赤い惑星」と呼ばれる理由は？",
          opts: ["燃えているから", "酸化鉄（サビ）の砂が多いから", "夕焼けが赤いから"],
          ans: 1
        };
      case 'jupiter':
        return {
          q: "木星にある巨大な嵐の渦は何と呼ばれる？",
          opts: ["大赤斑", "黒点", "台風1号"],
          ans: 0
        };
      case 'saturn':
        return {
          q: "土星のリングの主な成分は？",
          opts: ["鉄の塊", "氷の粒", "ガス"],
          ans: 1
        };
      case 'uranus':
        return {
          q: "天王星の自転の特徴は？",
          opts: ["逆回転している", "横倒しに回転している", "回転していない"],
          ans: 1
        };
      case 'neptune':
        return {
          q: "海王星の見た目の色は？",
          opts: ["赤色", "黄色", "青色"],
          ans: 2
        };
      default:
        return {
          q: `${planet.name}に関する正しい説明は？`,
          opts: ["太陽に一番近い", "太陽系の惑星である", "星ではない"],
          ans: 1
        };
    }
  };

  const quiz = getQuizData(planet.id);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setIsCorrect(index === quiz.ans);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="w-full mb-8">
        <span className="text-purple-400 text-xs font-bold tracking-widest mb-2 block text-center">QUESTION 1 / 5</span>
        <h3 className="text-xl md:text-2xl font-bold text-white text-center">{quiz.q}</h3>
      </div>

      <div className="w-full space-y-3">
        {quiz.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`w-full p-4 rounded-xl text-left font-medium transition-all duration-300 flex items-center justify-between border ${
              selected === i 
                ? (isCorrect ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-red-500/20 border-red-500 text-red-300')
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200'
            }`}
          >
            <span>{String.fromCharCode(65 + i)}. {opt}</span>
            {selected === i && (
              isCorrect ? <Check size={20} /> : <AlertCircle size={20} />
            )}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className={`mt-6 p-4 rounded-lg w-full text-center animate-[fadeIn_0.5s] ${isCorrect ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
          {isCorrect ? (
            <div>
              <div className="font-bold text-lg mb-1">正解！</div>
              <p className="text-xs opacity-80">{planet.name}についてよく知っていますね！</p>
            </div>
          ) : (
            <div>
              <div className="font-bold text-lg mb-1">残念...</div>
              <p className="text-xs opacity-80">正解は {String.fromCharCode(65 + quiz.ans)} でした。</p>
            </div>
          )}
          <button className="mt-3 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs tracking-widest transition-colors">
            次の問題へ
          </button>
        </div>
      )}
    </div>
  );
};

const EnglishContent = ({ planet }: { planet: PlanetData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-950/30 border border-emerald-500/20 p-6 rounded-xl text-center">
        <div className="text-xs text-emerald-400 tracking-widest mb-2">TODAY'S KEYWORD</div>
        <div className="text-4xl font-bold text-white mb-2">{planet.name}</div>
        <div className="text-emerald-200/60 italic font-serif">名詞 • 天体</div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-black/20 rounded-lg border-l-2 border-emerald-500">
           <div className="text-[10px] text-gray-400 mb-1">ENGLISH DESCRIPTION</div>
           <p className="text-lg text-emerald-100 font-medium leading-relaxed font-serif">
             "{planet.descriptionEN}"
           </p>
        </div>

        <div className="p-4 bg-black/20 rounded-lg">
           <div className="text-[10px] text-gray-400 mb-2">日本語訳</div>
           <p className="text-sm text-gray-300">
             {planet.descriptionJA}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
         {[
           { en: 'Orbit', ja: '軌道' },
           { en: 'Surface', ja: '地表' },
           { en: 'Gravity', ja: '重力' },
           { en: 'System', ja: '系' }
         ].map((word) => (
           <div key={word.en} className="bg-white/5 hover:bg-white/10 p-3 rounded text-center cursor-pointer transition-colors">
              <div className="text-emerald-300 font-bold">{word.en}</div>
              <div className="text-[10px] text-gray-500">{word.ja}</div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default DetailScreen;