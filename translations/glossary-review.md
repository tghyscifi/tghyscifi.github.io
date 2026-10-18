# 英译术语候选表（待作者定稿）

整理日期：2026-10-18。依据：当前六篇小说、小说中心导航、关于页面及十二条动态；由三个 Sol 6.1（低）子代理分别审阅，主代理交叉核对原文后汇总。

**所有条目均待定。推荐项不是已批准译名，本表不参与网站构建，也不会替换当前标题或正文。** 原文中已有的英文拼写另列，不为了凑备选而重新命名。

## 回复方式

- 每项使用固定编号，回复例如：`B01=B；C01=A；C02=控制权限，选 A；N01=证为名、辰为族名，但两篇不是同一人`。
- 可以直接给出自己的译名，也可以回复“保留中文”“暂缓”“需要更多上下文”。
- 若认可某一整组，可说“该组采用推荐项”，再列例外；未提及的条目保持待定。
- 建议先处理 B01–B03、C01–C08 和几项关键关系问题；衍生词、配角姓名和器械名可分批定稿。
- 定稿后再生成 `translations/glossary.yml`，记录原词、译名、别名和适用语境；不会在定稿前批量替换正文。

## B：作品、站点与作者

| 编号 | 原词及语境 | 候选 A | 候选 B／C | 推荐与需要确认的点 |
| --- | --- | --- | --- | --- |
| B01 | 《率月纪元》：系列总名，当前英文界面保留中文 | The Ratomoon Era | B：The Ratomoon Epoch；C：保留《率月纪元》，首次附英文解释 | **暂荐 A**。Ratomoon 是结合 `ratomoondp` 路径及 Ratom 提出的构词，尚不能认定为正式原名；请确认“率月”含义及是否已有英文书名。Era 较自然，Epoch 更突出历史分期。 |
| B02 | 溯月馆：个人网站名，也是小说中的月球科研机构 | Suyue Institute | B：Suyue Pavilion；C：Moonward Institute | **机构暂荐 A，网站可沿用同一专名**；B 更有文化空间、馆舍意象。C 是创作性意译，只有“溯月”确有趋向月球的寓意时才考虑。也可保留中文。溯读 sù，拼音候选为 Suyue，不是 Suoyue。是否要求网站与机构完全同译？ |
| B03 | 瞳观幻域：作者笔名 | Tongguan Huanyu | B：Vision into the Imaginal Realm；C：继续使用中文笔名 | **暂荐 A，允许首次与中文并列**。B 是较自由且较长的意译；如有自用英文名，以你提供的写法为准。 |

## C：核心科学、能力与术式

本组是衍生术语的基础。尤其 C02、C04、C07 暂不能仅凭字面敲定。

| 编号 | 原词及原文语境 | 候选 A | 候选 B／C | 推荐与需要确认的点 |
| --- | --- | --- | --- | --- |
| C01 | 率子／率子学：核心理论；RATOM 原文全称使用 Ratom | ratom / ratom theory | B：ratom / ratom science；C：作者另定词根 | **推荐 A**，复用原文线索。普通名词小写 ratom，专名中的大小写另按规则处理。是否正式确认该词根？ |
| C02 | 率权：有量值、信号和投影，可被生命或设备调动 | ratom authority（控制权限） | B：ratom weight（权重）；C：ratom potential（作用潜能） | **暂不强推任何一项**。请解释“权”首先指什么，以及量值是权限高低、影响力、容量还是其他物理量；会影响“率权量、率权实体、标准率权表”等全部译名。 |
| C03 | 奇术：前传明确称为扭曲现实的技术 | thaumaturgy | B：reality manipulation；C：reality engineering | **暂荐 A**，适合作为体系专名；B 是较直白的功能描述；C 科学工程感更强，但也更像人为命名的学科。你希望术语偏神秘传统还是工程技术？ |
| C04 | 术式：可编写、运行、编译，亦有物理线路或装置 | procedure | B：formula；C：spell | **暂荐 A**，强调可执行过程。B 偏数学结构，C 偏施法体验。术式是否同时指算法、运行实例和物理电路？“根术式”拟随之用 root procedure，不另立不兼容词根。 |
| C05 | 异能：后传能力体系，也与率子变异相关 | paranormal ability | B：anomalous ability；C：superpower | **暂荐 A**。B 更有异常现象研究语感，C 更口语、英雄叙事感更强。它与奇术／魔术是什么关系？ |
| C06 | 异能者：具有异能的人，关联身份及政治排斥 | ability user | B：esper；C：metahuman | **准确性优先暂荐 A，小说名词感优先可选 B**。B 容易让读者先想到心灵能力；C 更强调超出普通人类的身份。该词会连带决定联盟及反异能装备译名。 |
| C07 | 魔术：后传 DP 教使用的现实扭曲技术 | magic | B：magecraft；C：thaumaturgy | **暂荐 A，但须先确认与 C03 奇术的关系**。若二者是不同技术，不能都译为 thaumaturgy；若只是旧稿和新稿中的改名，需要你确认是否统一。 |
| C08 | 阿赖耶系：集合人类念想径迹，支持搜索与通信 | Alaya System | B：Alaya Network；C：Ālaya System | **暂荐 A**，保留“系”的开放性。B 明确网络结构；C 使用带变音符的转写。它是空间、场、网络还是总体系？是否有意借用“阿赖耶识”的命名？ |
| C09 | 三位一体理论：肉体、意识、灵魂三要素 | Trinity Theory | B：Tripartite Theory；C：Theory of the Three Aspects of Life | **暂荐 A**，保留原文宗教意象。B 较中性，C 解释性强但不够简洁。若选 A，相应术式暂作 Trinity procedures。 |
| C10 | 灵魂：有率子层面的技术定义，又保留文学、宗教语感 | soul | B：spirit | **推荐 A**。不直接改成 ratom projection，以免把设定解释替代原词；是否另有“精神／灵体”概念需要与 spirit 区分？ |
| C11 | 率阻／高率阻气体：术式中断或崩溃所关联的量与介质 | ratom resistance | B：ratom impedance | **条件性推荐 A**。请确认是否类比电阻、是否存在类似阻抗的其他机制；高率阻气体随之译作 high-ratom-resistance gas，必要时在行文中简化。 |
| C12 | 率阻场／率子抑阻场：两篇正传分别出现的抑制装置名称 | ratom suppression field | B：ratom inhibition field；C：ratom damping field | **暂荐 A**。先确认两种中文名称是否同物，以及抑制的是率子、异能效果还是施术者。不能仅因字形相近将其等同 C11 的物理量。 |
| C13 | 量神经元：后传说明与神经元量子化有关的能力 | Quantum Neurons | B：Quantized Neurons | **暂荐 A**，作为能力名简洁；B 更突出量子化状态。是否需要单数 Quantum Neuron？不使用 Network，以免自行改变能力结构。 |
| C14 | 认知Ⅰ—Ⅴ：量神经元的模式口令 | Cognition I–V | B：Cognitive Mode I–V | **口令推荐 A，说明文字可用 cognitive mode**。请确认是固定模式还是等级；罗马数字可以统一为 I、II、III、IV、V。 |
| C15 | 音速运动：能力名，正文可略超音速 | Sonic Motion | B：Supersonic Movement；C：Sonic Movement | **暂荐 A**，保留名称和实际效果之间的区别；B 把“超音速”写进了名称。 |
| C16 | 三锁阀值：后传提到与异能量、算法进化速度协调 | Triple-Lock Threshold | B：Three-Lock Threshold | **暂荐 A，但机制待说明**。“三锁”是三重限制、三个具体装置还是其他设定？原文“阀值”是否就是“阈值”，不静默改原文。 |
| C17 | 对异自适应屏障：防御异能能量的飞船新技术 | Adaptive Anti-Ability Barrier | B：Adaptive Ability-Defense Shield；C：Adaptive Anti-Esper Barrier | **暂荐 A**，防御对象是能力而非人。若仅针对能量，应在正文解释或采用更精确的后续译名；Barrier／Shield 的设备术语也需统一。 |
| C18 | 诱导术式：引发物理现象，与大一统理论相关 | induction procedure | B：inducement formula | **暂荐 A，随 C04 调整尾词**。induction 是否会与书中其他“感应／归纳”混淆？ |
| C19 | 炼化术式：已出现的例子是制造化学反应催化剂 | synthesis procedure | B：transmutation procedure；C：alchemical procedure | **暂不定稿**。A 偏合成，B 涉及物质转化，C 保留炼金意象；现有例子不足以证明其能力边界。 |
| C20 | 鉴识术式：获取一般信息，也可读取意识内容 | information-gathering procedure | B：identification procedure；C：appraisal formula | **暂荐 A**，范围相对准确但较长；B 偏辨识，C 偏鉴定。是否需要更有专名感的词？ |
| C21 | 领域术式：对空间或区域发生作用 | domain procedure | B：field procedure | **暂荐 A**。与 C22 结界是否为技术和效果、上位和下位的关系？避免未经确认把 domain 与物理 field 混同。 |
| C22 | 结界：可阻隔、分割空间或干扰认知 | barrier | B：ward；C：bounded field | **暂荐 A**，功能较宽；B 偏防护和驱离，C 更强调有边界的作用域。需与 C17 装备名称保持可理解的差别。 |
| C23 | 第二变法：与鉴识极限及禁式相关，正文称禁式为其奇术形式 | Second Transformation | B：Second Method | **待解释后选择**。不是现实政治意义的“第二次改革”；“变法”在能力分类中具体指什么？ |
| C24 | 第二禁式·阿卡夏记录：前传实际发动的名称 | Second Forbidden Procedure: Akashic Records | B：Second Forbidden Formula: Akashic Record | **暂荐 A，尾词随 C04**。先确认“第二”是序号还是层级；保留它与 C23 的关联而不合并名称。 |
| C25 | 率权实体：可探测到的游荡实体 | ratom-authority entity | B：ratom entity；C：ratom-weight entity | **暂缓，依赖 C02**。它是由率权构成、由率权产生，还是仅具有率权的实体？ |
| C26 | 对星门：星系级空间传送装置 | Interstellar Gate | B：Paired Stargates；C：Star-Link Gate | **暂荐 A，保留功能**。“对”是否指成对建设和对应端点？若是，B 才更准确。 |

## O：政体、机构与势力

复合名称中的 ability user／esper、ratom 等在基础词定稿后统一联动，不单独混用。

| 编号 | 原词及语境 | 候选 A | 候选 B／C | 推荐与需要确认的点 |
| --- | --- | --- | --- | --- |
| O01 | 太阳系人类联邦：正传主要政体 | Human Federation of the Solar System | B：Solar System Human Federation；C：Solar Human Federation | **暂荐 A**，完整且自然；C 最短但压缩了“太阳系”。是否采用 the Federation 为通用简称？ |
| O02 | 第58人类联邦／58联邦：后传政体，源于第58号国家 | Human Federation 58 | B：Human Federation No. 58 | **暂荐 A**。原文是编号来源，并非历史上第58个联邦，暂不采用 58th Human Federation。是否与 O01 为不同稿本中的同一政体？在作者确认前分列。 |
| O03 | 独立AI统合体：AI 政治实体 | Independent AI Collective | B：Independent AI Union；C：Independent AI Consortium | **暂荐 A**。Collective 可能使人联想到集体意识；统合体是否确有共享意识或只是政治联合？保留 AI，不造新缩写。 |
| O04 | 自由异能联盟：异能者政体 | Free Esper Alliance | B：Alliance of Free Ability Users；C：Free Metahuman Alliance | **须随 C06 选择**；若选 esper，暂荐 A。自由是政体自称还是成员的自由身份？ |
| O05 | 柯伊伯城邦：中立人类势力 | Kuiper City-States | B：Kuiper City-State；C：Kuiper Commonwealth | **单复数待确认**。多个城邦选 A，单一城邦选 B，C 会加入共同体含义，不能因顺口就采用。 |
| O06 | DP教：兼具科研地位的宗教及政治势力 | Church of DP | B：DP Faith；C：DP Order | **机构名称暂荐 A，信仰体系可用 B**。是否具有教会组织？不默认使用带贬义的 cult，也不为 DP 编造展开词。 |
| O07 | 七使徒：初期掌握核心知识的七人 | Seven Apostles | B：Seven Envoys；C：Seven Disciples | **暂荐 A**，保留宗教象征。是否为正式称号，和 DP 教称谓是否有继承关系？ |
| O08 | 观测者学派／“观测者”学派：科研组织与立场 | School of Observers | B：Observer School；C：Observationalist School | **暂荐 A**，保留“观测者”作为人的含义。它是实体组织、研究学派还是哲学思想流派？ |
| O09 | 统一复兴党：联邦执政党 | Unity and Revival Party | B：Party of Unity and Renewal；C：Unified Revival Party | **暂荐 A**。统一是政治目标还是联合组成？Revival 是否须与“大复兴”统一？暂不自行确定英文党名缩写。 |
| O10 | 历史安全保障局 | Historical Security Bureau | B：Bureau for the Safeguarding of History | **暂荐 A**，简洁且保留原名；B 更突出“保障历史”这一含义。请确认机关是否刻意采用别扭的官样名称。 |
| O11 | 联邦安全局 | Federal Security Bureau | B：Federal Security Service | **暂荐 A**。与 O10 是不同机构、上下级还是改名关系？不因为功能类似合并。 |
| O12 | 蔷薇赤旗：叛乱组织 | Rose and Red Flag | B：Red Rose Banner | **暂荐 A**，保留两种并列象征；B 将其重组为红蔷薇旗，是否偏离原意需作者判断。 |
| O13 | 三大学院／V学院、S学院、W学院 | Three Great Academies; V/S/W Academy | B：Three Major Institutes; V/S/W Institute | **暂荐 A**。字母保留原样，不为 V、S、W 编造全称。学院是否具有大学层级，会影响校长职衔。 |
| O14 | 院系／族系：两类政治势力系统 | academy faction / clan faction | B：academic bloc / dynastic bloc | **暂荐 A**。这里的“院系”不作普通大学 faculty／department；若强调松散多组织联合，B 更合适。 |
| O15 | 辰氏家族 | House Chen | B：Chen Clan | **暂荐 A**，偏家族政治和贵族势力；若族群性强于贵族性可用 B。 |
| O16 | 红月家族 | House Hongyue | B：House Red Moon；C：Red Moon Clan | **暂荐 A**，便于与人物姓名保持一致；若“红月”是必须保留的意象可选 B。 |
| O17 | 华熵集团：四大家族之一，名称含集团 | Huashang Group | B：Hua Entropy Group | **暂荐 A**，保留专名；B 明示“熵”的意象但会拆解中文构词。它是企业、家族企业还是更广泛政治集团？ |
| O18 | 北族：北极势力 | Northern Clan | B：Beizu；C：Northern People | **暂荐 A，前提是单一家族／氏族**；若为族群则 C 更合适，若为不可拆解专名可用 B。 |
| O19 | 最高联盟会议：联盟最高决策机构 | Supreme Alliance Council | B：Supreme Alliance Assembly | **暂荐 A**，符合少数代表议事；B 更偏代表大会。它是常设机关还是会议本身？ |
| O20 | 罪使：精英异能者微型组织 | Envoys of Sin | B：Sinbearers；C：Apostles of Sin | **暂荐 A**，与“七使徒”保留区别；B 更有赎罪／承担罪孽意味，C 刻意延续宗教意象。 |

## H：历史、政治思想与身份

| 编号 | 原词及语境 | 候选 A | 候选 B／C | 推荐与需要确认的点 |
| --- | --- | --- | --- | --- |
| H01 | 神谕事件／后神谕时代：2028 年历史分歧点 | Oracle Event / Post-Oracle Era | B：Revelation Event / Post-Revelation Era | **暂荐 A**，与现有标题词根衔接；B 更强调神启和知识授予。事件、时期与篇名须使用同一规则。 |
| H02 | 纯白立方 | Pure White Cube | B：White Cube；C：Pure-White Cube | **暂荐 A**，保留纯白这一形容；是否属于正式专名，决定后文能否简称 the Cube。 |
| H03 | 第一／第二次统合独立战争 | First/Second War of Collective Independence | B：First/Second AI Independence War | **待 O03 与历史视角确认**。“统合”是否统合体简称，以及谁独立于谁？不使用含混的 Integration Independence War。 |
| H04 | 太阳系战国／太阳系战国时代 | Solar System Warring States Period | B：Era of the Warring Solar States | **暂荐 A**，突出史学时期及“战国”比喻；是否有意借用中国历史分期？ |
| H05 | 反帝革命／反帝革命战争 | Anti-Imperialist Revolution / Revolutionary War | B：Revolution against the Empire / Anti-Imperial Revolutionary War | **需确认“帝”同时指帝国制度、具体帝国还是帝国主义**，不能把政治内涵自动简化为推翻君主。 |
| H06 | 大复兴 | Great Revival | B：Great Renewal | **暂荐 A**，沿用复兴词根；是否官方运动名、是否带刻意的宣传修辞？ |
| H07 | 全盘革新 | Comprehensive Renewal | B：Total Reform | **暂荐 A**，保留全面更新的官方措辞；B 更直接，但政治运动色彩不同。 |
| H08 | 星际大讨论 | Great Interplanetary Debate | B：Great Interstellar Debate | **取决于地理范围**：太阳系行星之间选 A，跨恒星系选 B；“星际”不能只按字面固定为 interstellar。 |
| H09 | 泛人类主义 | Pan-Humanism | B：Panhumanism；C：Universal Humanism | **暂荐 A**。A/B 是拼写选择，C 会改变概念重心；请确认是否将 AI、异能者纳入“人类”。 |
| H10 | 工程社会主义：动态中作者提出的暂名 | Engineering Socialism | B：Engineering-Based Socialism；C：Engineered Socialism | **暂荐 A**。B 强调方法，C 更像被设计制造出的制度。你所说的工程是工程方法、制度设计还是技术治理？ |
| H11 | 军事贵族 | military aristocracy | B：military nobility | **暂荐 A**，侧重阶级／政治结构；B 更像制度化、世袭的贵族身份。 |
| H12 | 机甲骑士／骑士阶层 | Mecha Knight / knightly class | B：Mech Knight / knightly estate；C：Armored Knight / knight caste | **暂荐 A**。caste 强化封闭世袭，estate 强调法定身份；“骑士”是军衔、资格还是阶级称呼？ |
| H13 | 对异能骑士军 | Counter-Esper Knight Corps | B：Anti-Ability Knight Force | **暂缓，随 C06 与军制确认**。“军”是具体军级单位还是泛称？不能仅为顺口把它升级或降级成 Army／Corps。 |
| H14 | 星防／火星星防文官系统 | Planetary Defense / Martian Planetary Defense Civil Service | B：Planetary Security / Martian Defense Administration | **暂荐 A**。它是否包括行星轨道？文官是国防行政还是非战斗军官？ |
| H15 | 定局事变：后传影响三方格局的历史事件 | Settlement Incident | B：Decisive Incident；C：Defining Crisis | **暂荐 A，待解释“定局”是事件名称还是后世评价**。B/C 更明显地解释其结果。 |
| H16 | “289”计划／第三期 | Project 289 / third intake | B：Program 289 / Phase III | **计划名暂荐 Project 289**；第三期是第三批成员选 intake，若是项目第三阶段才选 Phase III。 |
| H17 | 政委 | political commissar | B：commissar | **推荐 A 作为首次正式职称，后文可用 B**。是否具有本作特有的组织设置或级别？ |
| H18 | 防御性写作：关于页的表达策略概念 | defensive writing | B：self-protective writing | **暂荐 A**；B 更明确指避免表达风险。不是军事防御写作。 |

## N：人物与地名

一般汉语姓名建议不加声调、姓在前名在后；中点、族名和外文音译姓名另确认。不会为“有两个候选”而随意改造已有外文名。

| 编号 | 原词及语境 | 候选 A | 候选 B／C | 推荐与需要确认的点 |
| --- | --- | --- | --- | --- |
| N01 | 证辰（前传）／证·辰（后传） | Zheng Chen | B：Chen Zheng；C：后传保留分隔为 Zheng · Chen | **先确认名、姓／族名顺序及人物关系**。后传明确为辰氏成员；不能仅凭名字相似认定两篇是同一人物或直接归一。 |
| N02 | 夏空 | Xia Kong | B：Kong Xia | **暂荐 A**，遵循普通汉名姓前；不自动意译为 Summer Sky。 |
| N03 | 夏祜／夏金海：原文明示现名与曾用名 | Xia Hu / Xia Jinhai | B：Hu Xia / Jinhai Xia | **暂荐 A**。必须保留两种名字及揭示时机，不在英文中一开始就统一成一个名字。 |
| N04 | 凛东东／凛锋：原文明示改名 | Lin Dongdong / Lin Feng | B：Lin Dong-Dong / Lin Feng | **暂荐 A**，保留重叠名；是否需要特别体现旧名的幼稚感，留待对白处理。 |
| N05 | 凛冬／凛渊：两个不同人物 | Lin Dong / Lin Yuan | B：Dong Lin / Yuan Lin | **暂荐 A**。不意译为 Winter／Abyss，也不与凛东东混为同一人。 |
| N06 | 红月·影：红月家族人物 | Hongyue Ying | B：Ying Hongyue；C：Ying of House Hongyue | **暂荐 A，按族名在前处理**；如中点结构为另一套命名规则可选 B。C 适合介绍身份，不宜每次用作姓名。 |
| N07 | 伊莱莎：外文音译姓名，未见原文拼写 | Elisa | B：Eliza；C：Elyssa | **暂荐 A，但无法唯一反推**。请给出原始拼写，或直接选定一个新正式拼写。 |
| N08 | 神久夜弘司／弘司引擎 | 弘司候选 Hiroshi；引擎 Hiroshi Engine | B：弘司 Koji；引擎 Koji Engine | **暂不定稿**。请给出整个姓名的日文读法或自定罗马字，尤其“神久夜”；不能依据汉字断定读音。引擎是否确实以此人命名？ |
| N09 | 费利克斯·沃格尔 | Felix Vogel | B：作者已有外文拼写 | **暂荐 A，仅是常见对应候选**。若已有原名，以原名为准，不另造 Vogell 等拼写。 |
| N10 | 艾伦 | Alan | B：Allen；C：Allan | **暂荐 A，但音译不能唯一对应**。请选择或提供全名。 |
| N11 | 莱娅·斯沃博达 | Leia Svoboda | B：Lea Svoboda；C：Leya Svoboda | **暂荐 A，仍需确认原名**。姓氏也不能仅因常见拼写就认定，国籍与命名来源可辅助判断。 |
| N12 | 伊戈尔／阿德勒教授 | Igor / Professor Adler | B：作者已有外文拼写或全名 | **暂荐 A**，暂不补造姓氏或名字。阿德勒的 Professor 只是称谓，不是姓名的一部分。 |
| N13 | 桤／桤校长：V学院负责人 | Qi / Headmaster Qi | B：Alder / Headmaster Alder；C：President Qi | **名字暂荐 Qi**；Alder 保留桤树意象。职衔依学院层级确定：Headmaster 偏学校，President 偏大学。 |
| N14 | 布立奇教授：仅见中文音译 | Professor Buliqi | B：Professor Bridge；C：Professor Briggs | **优先请作者提供原名；未定可用 A 占位**。B/C 仅是可供作者创造性选定的名字，不代表从中文还原出的原名。 |
| N15 | 湮尼尔：华熵集团相关人物 | Yan Ni'er | B：Yannier；C：Yannil | **优先请作者提供原名，A 仅作音译占位**；B/C 为创作拼写，不能自称正式来源。 |
| N16 | 李事任／杨温礼／高颂灯 | Li Shiren / Yang Wenli / Gao Songdeng | B：Shiren Li / Wenli Yang / Songdeng Gao | **暂荐 A**。姓名中的历史联想留在原文层面，不在译名里额外加说明或换成现实人物。 |
| N17 | 约瑟夫·乌里扬诺夫 | Joseph Ulyanov | B：Josef Ulyanov；C：Iosif Ulyanov | **暂荐 A，但须确认人物命名语言**，不自行等同某位历史人物。 |
| N18 | 罗莎·布瑞德 | Rosa Brede | B：Rosa Bred；C：作者原定拼写 | **待作者确认**。只凭中文不能可靠恢复姓氏；两种拼写都是待选候选。 |
| N19 | 林钧寰：前传人物 | Lin Junhuan | B：Junhuan Lin | **暂荐 A**，按普通汉名规则；“小林”等称呼在具体语境中另处理。 |
| N20 | 东黎城／东阳城／荧哲联大 | Dongli City / Dongyang City / Yingzhe United University | B：Dongli / Dongyang / Yingzhe Joint University | **城市暂荐 B 的简名，大学暂荐 A 的形式**。联大是联合大学还是高校联盟？是否存在既定全称？ |
| N21 | 赫特星南极：Heart 的地理区域 | the South Pole / the southern polar region | B：Heart's South Pole | **推荐 A，需强调所属行星时用 B**。不使用 Antarctica 替代：当前情节不在地球南极洲；Heart 原文英文拼写见固定项 F02。 |
| N22 | 黄鹤楼／武汉：后传机械造物中的文化名称 | Yellow Crane Tower / Wuhan | B：Huanghelou / Wuhan | **暂荐 A**，首次可保留 Huanghelou 作对应；请确认是否希望强化现实地标意象，以及小说中的同名结构是否按地标处理。 |

## E：器械和设施命名

| 编号 | 原词及语境 | 候选 A | 候选 B／C | 推荐与需要确认的点 |
| --- | --- | --- | --- | --- |
| E01 | 斯特罗斯基座 | Stross Base | B：Strauss Base；C：作者原定拼写 + Platform | **暂缓**。专名来源、读音和 base／platform 的器械形态需确认，不能据音译确定外文姓氏。 |
| E02 | 杨氏定向仪 | Yang Direction Finder | B：Yang Orientation Instrument | **暂荐 A**，若其主要用途确为测定方位；若是执行定向操作则 B 可能更接近。 |
| E03 | 卡拉比线圈 | Calabi Coil | B：Calabi Coils | **暂荐 A**，多台或多组时按语法用复数；请确认“卡拉比”的原始拼写。 |
| E04 | 标准率权表 | Standard Ratom-Authority Meter | B：Standard Ratom-Potential Meter | **暂缓，依赖 C02**；表是测量仪器，暂不作 chart／table。 |
| E05 | 法伦海特指针 | Fahrenheit Pointer | B：Fahrenheit Probe | **暂荐 A**，若指针是字面结构；如果是落地探测器，B 更准确。Fahrenheit 为音译候选，须确认命名来源。 |
| E06 | 静滞舱：固定生命要素状态的设备 | stasis chamber | B：suspension chamber | **暂荐 A**，不直接称 cryogenic pod，因为原文没有说明必须低温。 |
| E07 | 率子模块／施术单元／反重力引擎 | ratom module / procedure execution unit / antigravity engine | B：ratom module / casting unit / anti-gravity drive | **暂荐 A 的工程表述**。执行单元随 C04 调整；引擎和 drive 是否区分推进与反重力作用？ |

## T：章节名与篇名

这里只提名称，不翻译正文。现有界面标题一并作为候选复核，不自动替换。

| 编号 | 原词 | 候选 A | 候选 B／C | 推荐与需要确认的点 |
| --- | --- | --- | --- | --- |
| T01 | 神谕之初 | The Dawn of the Oracle | B：The Beginning of the Oracle（现译）；C：The Dawn of Revelation | **暂荐 A**，强调时代开端；C 仅在 H01 选 Revelation 时采用。 |
| T02 | 生灵解剖 | Dissecting Life（现译） | B：An Anatomy of Life；C：Anatomy of the Living | **暂荐 A**，保留动作和不适感；B 更像理论解剖，C 更强调被解剖的生者。 |
| T03 | 终焉世代 | The Final Generation（现译） | B：The Last Generation；C：The Generation of the End | **暂荐 A**。Last 更直白，C 更强调“终焉”作为概念或时代；是否是群体自称？ |
| T04 | 弦外杂音 | Discordant Overtones | B：Noise Beyond the Strings（现译）；C：Dissonant Overtones | **暂荐 A**，兼顾弦外之意及不和谐音色；B 保留字面意象，C 更偏听觉／音乐。 |
| T05 | 黄鹤楼，宜逢故人 | Yellow Crane Tower: A Time for Old Friends | B：A Reunion at Yellow Crane Tower；C：Huanghelou: A Time for Old Friends | **暂荐 A**，保留“宜”的适逢语气；B 简洁但弱化这层意味。黄鹤楼随 N22。 |
| T06 | 南极，隐居勿扰 | The South Pole: In Seclusion, Do Not Disturb | B：South Polar Retreat: Do Not Disturb | **暂荐 A**，并修正现译 Antarctica 的地点含义；B 更像隐居处门牌，需判断是否符合原标题语气。 |

## F：原文已有英文或无需重新造名的项目

| 编号 | 原词 | 建议保留的写法 | 依据／待确认内容 |
| --- | --- | --- | --- |
| F01 | RATOM／率子一致性畸化引导装置 | RATOM；Ratom Accordance Tortuosity Orienting Machine | `p02.md` 明确给出全称和递归缩写。即使认为用词可润色，也应另列修订建议，不擅改；本次请确认沿用或由作者另定。 |
| F02 | 赫特星 | Heart；the planet Heart | `s1-1.md` 明确写出 Heart；不改成 Hert、Hertt 等反推拼写。 |
| F03 | 犸德纳 | Madnug | `m1-1-A.md` 明确给出拼写；机甲等级另外统一为 Class C／Class D 等，待确认等级性质。 |
| F04 | 非法图书网站 | C-Lib | `m1-1-B.md` 已用拉丁字母命名，不补造 C 的含义或全称。 |
| F05 | Artists | Artists | `s1-1.md` 已使用英文组织名；不自行改成 The Artists 或回译成其他名字。是否允许行文中用定冠词按语法处理，可在风格约定中决定。 |
| F06 | DP文明 | DP Civilization | `p01.md` 说明 DP 为两名发现者姓氏首字母；保留 DP，不猜两人的姓氏或另造英文展开。DP教另见 O06。 |
| F07 | V／S／W学院 | V／S／W + Academy 或 Institute | 保留原字母，机构类型按 O13；不猜完整名称。 |
| F08 | 唯物史观／生产力／生产关系／再生产 | historical materialism / productive forces / relations of production / reproduction | 建议使用通行术语，不为满足备选数量制造新词；特殊句子根据具体论述调整，避免把再生产一律理解为生物繁殖。 |
| F09 | Hexo、Meow、Waline、Git、Android 等项目名 | 保留各项目原名与大小写 | 教程、关于和动态中的软件名不意译，不为同一项目另造中文拼音名。 |

## 优先需要作者解释的关系

1. **C02 率权**：“权”的物理／概念含义及量值性质是什么？
2. **C03／C05／C07**：奇术、异能、魔术是三套机制、不同操作方式，还是不同稿本的改名？
3. **N01**：证辰与证·辰的关系，以及证、辰分别是名、姓还是族名。
4. **O01／O02**：太阳系人类联邦与第58人类联邦是否属于同一政体的不同稿本；不预先消除旧稿差异。
5. **H03**：“统合独立战争”是统合体争取独立，还是其他历史命名？
6. **N08、N14、N15、N18、E01**：有无原先设想的外文名／日文读音？没有也可以直接从候选中创作性选定，选后才视作正式名称。
7. **C12**：率阻场与率子抑阻场是否同一种场？

## 主要来源与范围说明

- `source/_posts/p01.md`：神谕事件、纯白立方、DP文明及人物初次出现。
- `source/_posts/p02.md`：率子学、奇术、术式体系、率权、RATOM和前传器械。
- `source/_posts/m1-1-A.md`、`m1-1-B.md`：联邦政治历史、机甲骑士、人物改名与革命运动。
- `source/_posts/s1-0.md`、`s1-1.md`：后传政体、Heart、家族与学院、量神经元和对星门。
- `source/_posts/ratomoondp.md`、`about.md`：作品及机构的自我介绍。
- `source/_data/essay.yml`：工程社会主义及动态文案语境。
- `locales/en.yml`：当前英文标题的暂定译法。

本表是首轮主要术语候选，不宣称已经穷尽所有人名、临时设施名或引用作品的专名。一般词语、网络梗、方言句和第三方作品已有译名将在具体篇章翻译时另行处理；遇到新增设定词会续编编号，已有编号不重排。
