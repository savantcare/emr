module.exports = (sequelize, Sequelize) => {
  const Component = sequelize.define("component", {
    componentId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },    
    panelSequence: { // In the health tab or the other tab. A component with sequence 1 is shown before component with sequence 2
      type: Sequelize.INTEGER
    },
    panelStateWhenLoaded: { // 1. The component panel is open 2. The bootstrap panel is closed.
      type: Sequelize.BOOLEAN 
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  return Component;
};
