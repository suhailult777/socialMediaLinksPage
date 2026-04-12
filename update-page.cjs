const fs = require('fs');

const content = fs.readFileSync('canvases/src/app/page.tsx', 'utf8');

const replacement = `
  const displayedProjects = filter === 'All' 
    ? uniqueProjects 
    : uniqueProjects.filter((repo: any) => {
        const lang = (repo.language && repo.language !== '-' && repo.language !== 'null') ? repo.language : 'Other';
        return lang === filter;
      });

  const featured = ['AI-VsCode-extension', 'AI-multi-code-agent', 'CryptoPriceTracker'];
  const ongoing = ['java-employee-management-system', 'blogging-website-s', 'MedicalExperts'];

  const splitProjects = {
    "PRIME_DIRECTIVES [FEATURED]": displayedProjects.filter(p => featured.includes(p.name)),
    "ACTIVE_THREADS [ONGOING]": displayedProjects.filter(p => ongoing.includes(p.name)),
    "DECRYPTED_ARCHIVES [COMPLETED]": displayedProjects.filter(p => !featured.includes(p.name) && !ongoing.includes(p.name))
  };
`;

const updatedContent = content.replace(
  /const displayedProjects = filter === 'All'[\s\S]*?(?=return \()/,
  replacement + '\n  '
);

const gridOld = `{/* Cyberpunk Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((repo: any) => {`;

const gridNew = `{/* Cyberpunk Grid */}
        <div className="w-full space-y-16">
          {Object.entries(splitProjects).map(([categoryName, projects]) => {
            if (projects.length === 0) return null;
            return (
              <div key={categoryName} className="w-full">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: "2rem" }} 
                    viewport={{ once: true }}
                    className="h-[2px] bg-green-500 shadow-[0_0_8px_#22c55e]"
                  />
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                    {categoryName}
                  </h3>
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: "100%" }} 
                    viewport={{ once: true }}
                    className="h-[1px] flex-1 bg-green-500/20"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  <AnimatePresence mode="popLayout">
                    {projects.map((repo: any) => {`;

const endOld = `                  </motion.a>
              );
            })}
          </AnimatePresence>
        </div>`;

const endNew = `                  </motion.a>
              );
            })}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>`;

fs.writeFileSync('canvases/src/app/page.tsx', updatedContent.replace(gridOld, gridNew).replace(endOld, endNew));

console.log("Replaced successfully!");
